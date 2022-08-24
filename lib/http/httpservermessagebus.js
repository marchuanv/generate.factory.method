const http = require("http");
const utils = require('utils');
const dns = require('dns');
function HttpServerMessageBus({ scopeId, senderAddress, messageQueue, logger, timeout }) {
    const httpServerRequestsQueueName = `${scopeId}_httpserverrequests`;
    const httpServerResponseMessagesQueueName = `${scopeId}_httpserverresponsemessages`;
    const httpServerStartQueueName = 'httpserverstart';
    const httpServerStartedQueueName = 'httpserverstarted';
    const httpServerStopQueueName = 'httpserverstop';
    const httpServerStoppedQueueName = 'httpserverstopped';
    messageQueue.bind({ queueName: httpServerRequestsQueueName });
    messageQueue.bind({ queueName: httpServerResponseMessagesQueueName });
    messageQueue.bind({ queueName: httpServerStartQueueName });
    messageQueue.bind({ queueName: httpServerStartedQueueName });
    messageQueue.bind({ queueName: httpServerStopQueueName });
    messageQueue.bind({ queueName: httpServerStoppedQueueName });
    messageQueue.dequeueMessage({ queueName: httpServerStartQueueName }).then(() => {
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
            messageQueue.queueMessage({ message: {}, queueName: httpServerStartedQueueName });
        });
        server.on('close', () => {
            logger.log({ date: new Date(), context: 'HttpServer', text: 'server was stopped' });
            messageQueue.queueMessage({ message: {}, queueName: httpServerStoppedQueueName });
        });
        messageQueue.dequeueMessage({ queueName: httpServerStopQueueName }).then(() => {
            server.close();
        });
        server.listen(options);
    });
}
module.exports = { HttpServerMessageBus };


