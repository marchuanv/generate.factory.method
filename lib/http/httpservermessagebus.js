const http = require("http");
const utils = require('utils');
const dns = require('dns');
function HttpServerMessageBus({ scopeId, httpServerRequestMessageQueueBinding, httpServerResponseMessageQueueBinding, httpServerStartMessageQueueBinding, httpServerStartedMessageQueueBinding, httpServerStopMessageQueueBinding, httpServerStoppedMessageQueueBinding, senderAddress, logger, timeout }) {
    httpServerStartMessageQueueBinding.dequeueMessage().then(() => {
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
                await httpServerRequestMessageQueueBinding.queueMessage({ message: httpRequest });
                const { message } = await httpServerResponseMessageQueueBinding.dequeueMessage();
                httpResponse.writeHead(
                    message.getStatusCode(),
                    message.getStatusMessage(),
                    message.getHeaders()
                ).end(message.getEncryptedContent());
            });
        });
        server.on("listening", () => {
            logger.log({ date: new Date(), context:'HttpServer', text:`listening on: ${ utils.getJSONString(options) }` });
            httpServerStartedMessageQueueBinding.queueMessage({ message: { scopeId } });
        });
        server.on('close', () => {
            logger.log({ date: new Date(), context: 'HttpServer', text: 'server was stopped' });
            httpServerStoppedMessageQueueBinding.queueMessage({ message: { scopeId } });
        });
        httpServerStopMessageQueueBinding.dequeueMessage().then(() => {
            server.close();
        });
        server.listen(options);
    });
}
module.exports = { HttpServerMessageBus };


