const http = require("http");
const utils = require('utils');
const dns = require('dns');
const { HttpServerMessageBus } = require("./httpservermessagebus.prototype");
HttpServerMessageBus.prototype.constructor = function({ 
    contextName,
    httpServerRequestMessageQueueBinding,
    httpServerResponseMessageQueueBinding,
    httpServerStartMessageQueueBinding,
    httpServerStartedMessageQueueBinding,
    httpServerStopMessageQueueBinding,
    httpServerStoppedMessageQueueBinding,
    senderAddress,
    logger,
    timeout
}) {
    httpServerStartMessageQueueBinding.dequeueMessage().then(({ message }) => {
        if (message.contextName !== message.contextName) {
            httpServerStartMessageQueueBinding.queueMessage({ message });
        }
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
            httpServerStopMessageQueueBinding.queueMessage({ message: { contextName } });
            httpServerRequestMessageQueueBinding.unbind();
            httpServerResponseMessageQueueBinding.unbind();
            console.log(error);
        });
        server.on("request", async (httpRequest, httpResponse) => {
            httpRequest.setTimeout(timeout);
            httpRequest.on('error', (error) => console.error(error));
            httpRequest.body = '';
            for await (const chunk of httpRequest) {
                httpRequest.body += chunk
            }
            await httpServerRequestMessageQueueBinding.queueMessage({ message: httpRequest });
            const { message } = await httpServerResponseMessageQueueBinding.dequeueMessage();
            httpResponse.writeHead(
                message.getStatusCode(),
                message.getStatusMessage(),
                message.getHeaders()
            ).end(message.getEncryptedContent());
        });
        server.on("listening", () => {
            logger.log({ date: new Date(), context:'HttpServer', text:`listening on: ${ utils.getJSONString(options) }` });
            httpServerStartedMessageQueueBinding.queueMessage({ message: { contextName } });
        });
        server.on('close', () => {
            logger.log({ date: new Date(), context: 'HttpServer', text: 'server was stopped' });
            httpServerRequestMessageQueueBinding.unbind();
            httpServerResponseMessageQueueBinding.unbind();
            httpServerStoppedMessageQueueBinding.queueMessage({ message: { contextName } });
        });
        httpServerStopMessageQueueBinding.dequeueMessage().then(({ message }) => {
            if (message.contextName === message.contextName) {
                server.close();
            } else {
                httpServerStopMessageQueueBinding.queueMessage({ message });
            }
        });
        server.listen(options);
    });
}
module.exports = { HttpServerMessageBus };
