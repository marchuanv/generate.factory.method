const http = require("http");
const utils = require('utils');
const dns = require('dns');
function HttpServerMessageBus({ senderAddress, messageQueue, logger, timeout }) {


    const httpServerRequestsQueueName = 'httpserverrequests';
    messageQueue.bind({ queueName: httpServerRequestsQueueName });
    
    const httpServerResponseMessagesQueueName = 'httpserverresponsemessages';
    messageQueue.bind({ queueName: httpServerResponseMessagesQueueName });

    const httpServerStartQueueName = 'httpserverstart';
    messageQueue.bind({ queueName: httpServerStartQueueName });

    const httpServerStopQueueName = 'httpserverstop';
    messageQueue.bind({ queueName: httpServerStopQueueName });

    messageQueue.peekMessage({ queueName: httpServerStartQueueName }).then(({ message }) => {
        if (message === null) { // no server created
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
                logger.log({ date:new Date(), context:'HttpServer', text:`listening on: ${ utils.getJSONString(options) }` });
                messageQueue.queueMessage({ message: { text: 'server created and started' }, queueName: httpServerStartQueueName });
                messageQueue.dequeueMessage({ queueName: httpServerStopQueueName }).then(() => {
                    server.close();
                });
            });
            server.listen(options);
        } else {
            messageQueue.queueMessage({ message: { text: 'new server required, stopping all previous hosts' }, queueName: httpServerStopQueueName });
        }
    });
}
module.exports = { HttpServerMessageBus };
