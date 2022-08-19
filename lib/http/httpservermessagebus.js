const http = require("http");
const utils = require('utils');
const dns = require('dns');
function HttpServerMessageBus({ senderAddress, messageQueue, logger, timeout }) {
    const httpServerRequestsQueueName = 'httpserverrequests';
    const httpServerResponseMessagesQueueName = 'httpserverresponsemessages';
    messageQueue.bind({ queueName: httpServerRequestsQueueName });
    messageQueue.bind({ queueName: httpServerResponseMessagesQueueName });
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
    server.on("listening", () => logger.log({ date: new Date(), context: 'HttpServer', text: `listening on: ${ utils.getJSONString(options)}` }));
    Object.defineProperty(this, 'start', { configurable: false, writable: false, value: () => server.listen(options) });
    Object.defineProperty(this, 'stop', { configurable: false, writable: false, value: () => server.close() });
}
HttpServerMessageBus.prototype.start = function() { };
HttpServerMessageBus.prototype.stop = function() { };
module.exports = { HttpServerMessageBus };
