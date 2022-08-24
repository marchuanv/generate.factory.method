const http = require("http");
const utils = require('utils');
const dns = require('dns');

const httpServerRequestsQueueName = 'httpserverrequests';
const httpServerResponseMessagesQueueName = 'httpserverresponsemessages';
const httpServerStartQueueName = 'httpserverstart';
const httpServerStopQueueName = 'httpserverstop';

const ensureServer = ({ senderAddress, messageQueue, logger, timeout }) => {
    const { senderHost, senderPort } = senderAddress;
    const options = { host: senderHost, port: senderPort };
    const server = http.createServer();
    server.on("error", (error) => {
        if (options.host) {
            dns.lookup(options.host, (dnsErr) => {
                if (dnsErr) {
                    logger.log({ date: new Date(), context: 'HttpServer', text: dnsErr.message });
                } else {
                    logger.log({ date: new Date(), context: 'HttpServer', text: error.message });
                }
            });
        } else {
            logger.log({ date: new Date(), context: 'HttpServer', text: 'host not specified' });
        }
    });
    server.on("request", (httpRequest, httpResponse) => {
        httpRequest.setTimeout(timeout);
        httpRequest.body = '';
        httpRequest.on('error', (error) => console.error(error));
        httpRequest.on('data', (chunk) => httpRequest.body += chunk );
        httpRequest.on('end', async () => {
            await messageQueue.queueMessage({ message: httpRequest, queueName: httpServerRequestsQueueName });
            const { message } = await messageQueue.dequeueMessage({ queueName: httpServerResponseMessagesQueueName });
            httpResponse.writeHead(
                message.getStatusCode(),
                message.getStatusMessage(),
                message.getHeaders()
            ).end(message.getEncryptedContent());
        });
    });
    server.on("listening", () => {
        logger.log({ date: new Date(), context:'HttpServer', text:`listening on: ${ utils.getJSONString(options) }` });
        messageQueue.queueMessage({ message: { text: 'server started' }, queueName: httpServerStartQueueName });
        messageQueue.dequeueMessage({ queueName: httpServerStopQueueName }).then(() => {
            server.close();
        });
    });
    server.on('close', () => {
        messageQueue.unbind({ queueName: httpServerRequestsQueueName });
        messageQueue.unbind({ queueName: httpServerResponseMessagesQueueName });
        logger.log({ date: new Date(), context: 'HttpServer', text: 'server was stopped' });
        messageQueue.queueMessage({ message: { text: 'server stopped' }, queueName: httpServerStopQueueName });
    });
    server.listen(options);
}

function HttpServerMessageBus({ senderAddress, messageQueue, logger, timeout }) {
    messageQueue.bind({ queueName: httpServerRequestsQueueName });
    messageQueue.bind({ queueName: httpServerResponseMessagesQueueName });
    messageQueue.bind({ queueName: httpServerStartQueueName });
    messageQueue.bind({ queueName: httpServerStopQueueName });
    messageQueue.peekMessage({ queueName: httpServerStartQueueName }).then(({ message }) => {
        if (message === null) { // no server created
            messageQueue.queueMessage({ message: { text: 'new server required, create and starting a server' }, queueName: httpServerStartQueueName });
        } else {
            messageQueue.queueMessage({ message: { text: 'new server required, stopping all previous hosts' }, queueName: httpServerStopQueueName });
            messageQueue.dequeueMessage({ queueName: httpServerStopQueueName }).then(() => {
                messageQueue.queueMessage({ message: { text: 'new server required, create and starting a server' }, queueName: httpServerStartQueueName });
            });
        }
    });
    messageQueue.dequeueMessage({ queueName: httpServerStartQueueName }).then(() => {
        ensureServer({ senderAddress, messageQueue, logger, timeout });
    });
}
module.exports = { HttpServerMessageBus };
