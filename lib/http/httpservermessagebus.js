const http = require("http");
const utils = require('utils');
const dns = require('dns');

function HttpServerMessageBus({ sharedMessageQueue, sharedLogger, senderAddress, timeout, contextId }) {
    const queueNames = 'queueNames';
    sharedMessageQueue.bind({ queueName: queueNames });
    sharedMessageQueue.dequeueGlobalMessage().then(({ message }) => {
        
        if (!message.startserver) {
            sharedLogger.log({ date: new Date(), context: 'HttpServer', text: 'failed to start http server' });
            return;
        }

        const { senderHost, senderPort } = senderAddress;
        const options = { host: senderHost, port: senderPort };
        const server = http.createServer();
        server.on("error", (error) => {
            if (options.host){
                dns.lookup(options.host, (dnsErr) => {
                    if (dnsErr){
                        throw(dnsErr);
                    } else {
                        throw(error);
                    }
                });
            } else {
                throw(error);
            }
        });
        server.on("request", (httpRequest, httpResponse) => {
            httpRequest.setTimeout(timeout);
            httpRequest.body = '';
            httpRequest.on('error', (error) => {
               console.error(error);
            });
            httpRequest.on('data', (chunk) => httpRequest.body += chunk );
            httpRequest.on('end', () => {
                sharedMessageQueue.dequeueMessage({ queueName: queueNames }).then( async ({ message }) => {
                    const { requestQueueName, responseQueueName } = message;
                    const data = httpRequest.body;
                    const { recipienthost, recipientport, senderhost, senderport, token } = httpRequest.headers;
                    const metadata = httpRequest.headers;
                    const messageStatusCode = 2;
                    const { httpRequestMessage } = createHttpRequestMessage({ messageStatusCode, Id: null, data, recipientHost: recipienthost,
                        recipientPort: recipientport, metadata, token, senderHost: senderhost, senderPort: senderport
                    });
                    await sharedMessageQueue.queueMessage({ message: httpRequestMessage, queueName: requestQueueName });
                    {
                        const { message } = await sharedMessageQueue.dequeueMessage({ queueName: responseQueueName });
                        const httpResponseMessage = message;
                        httpResponse.writeHead(
                            httpResponseMessage.getStatusCode(),
                            httpResponseMessage.getStatusMessage(),
                            httpResponseMessage.getHeaders()
                        ).end(httpResponseMessage.getEncryptedContent());
                    }
                    await sharedMessageQueue.queueMessage({ message: { requestQueueName, responseQueueName }, queueName: queueNames });
                });
            });
        });
        server.on("listening",async () => {
            sharedLogger.log({ date: new Date(), context: 'HttpServer', text: `listening on: ${utils.getJSONString(options)}` });
        });
        server.listen(options);
    });
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const requestQueueName = `${contextId}_HttpServerRequests`;
    const responseQueueName = `${contextId}_HttpServerResponses`;
    sharedMessageQueue.bind({ queueName: requestQueueName });
    sharedMessageQueue.bind({ queueName: responseQueueName });
    sharedMessageQueue.clearQueueMessages({ queueName: queueNames });
    sharedMessageQueue.queueMessage({ message: { requestQueueName, responseQueueName }, queueName: queueNames });
    sharedMessageQueue.queueGlobalOnceOffMessage({ message: { startserver: true } });
    Object.defineProperty(this, 'publishHttpResponseMessage', { configurable: false, writable: false, value: async ({ httpResponseMessage }) => {
        await sharedMessageQueue.queueMessage({ message: httpResponseMessage, queueName: responseQueueName });
    }});
    Object.defineProperty(this, 'subscribeToHttpRequestMessages', { configurable: false, writable: false, value: ({ callback }) => {
        sharedMessageQueue.dequeueMessage({ queueName: requestQueueName }).then( async ({ message }) => {
            await callback({ httpRequestMessage: message });
            this.subscribeToHttpRequestMessages({ callback });
        });
    }});
};
HttpServerMessageBus.prototype.publishHttpResponseMessage = async function({ message }) { };
HttpServerMessageBus.prototype.subscribeToHttpRequestMessages = function ({ callback }) { };
module.exports = { HttpServerMessageBus };