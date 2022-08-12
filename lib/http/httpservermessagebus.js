const http = require("http");
const utils = require('utils');
const dns = require('dns');
function HttpServerMessageBus({ sharedMessageQueue, senderAddress, timeout, contextId }) {
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const responseQueueName = `${contextId}_HttpServerResponses`;
    const requestQueueName = `${contextId}_HttpServerRequests`;
    sharedMessageQueue.bind({ queueName: responseQueueName });
    sharedMessageQueue.bind({ queueName: requestQueueName });
    sharedMessageQueue.dequeueGlobalMessage().then(() => {
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
            httpRequest.on('end', async () => {
                const data = httpRequest.body;
                const { recipienthost, recipientport, senderhost, senderport, token } = httpRequest.headers;
                const metadata = httpRequest.headers;
                const messageStatusCode = 2;
                const { httpRequestMessage } = createHttpRequestMessage({ messageStatusCode, Id: null, data, recipientHost: recipienthost,
                    recipientPort: recipientport, metadata, token, senderHost: senderhost, senderPort: senderport
                });
                await sharedMessageQueue.queueMessage({ message: httpRequestMessage, queueName: requestQueueName });
                const { message } = await sharedMessageQueue.dequeueMessage({ queueName: responseQueueName });
                const httpResponseMessage = message;
                httpResponse.writeHead(
                    httpResponseMessage.getStatusCode(),
                    httpResponseMessage.getStatusMessage(),
                    httpResponseMessage.getHeaders()
                ).end(httpResponseMessage.getEncryptedContent());
            });
        });
        server.on("listening",async () => {
            console.log(`listening on: ${utils.getJSONString(options)}`);
        });
        server.listen(options);
    });
    Object.defineProperty(this, 'publishHttpResponseMessage', { configurable: false, writable: false, value: async ({ httpResponseMessage }) => {
        await sharedMessageQueue.queueGlobalOnceOffMessage({ message: { text: 'ensureserverstarted' } });
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