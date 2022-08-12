const http = require("http");
function HttpClientMessageBus({ sharedMessageQueue, contextId, timeout }) {
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');
    const responseMessageQueueType = `${contextId}_HttpClientResponses`;
    const requestMessageQueueType = `${contextId}_HttpClientRequests`;
    sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType });
    sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType });
    Object.defineProperty(this, 'publishHttpRequestMessage', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        const { recipientHost, recipientPort } = httpRequestMessage.getRecipientAddress();
        const path = httpRequestMessage.getPath();
        const headers = httpRequestMessage.getHeaders();
        const method = httpRequestMessage.getMethod();
        const data = httpRequestMessage.getEncryptedContent();
        const httpRequest = http.request({host: recipientHost, port: recipientPort, path, headers, method });
        httpRequest.setTimeout(timeout);
        httpRequest.on('response', (httpResponse) => {
            httpResponse.body = '';
            httpResponse.setEncoding('utf8');
            httpResponse.on('error', (error) => console.error(error));
            httpResponse.on('data', (chunk) => httpResponse.body += chunk );
            httpResponse.on('end', async () => {
                const messageStatusCode = httpResponse.statusCode;
                const data = httpResponse.body;
                const { recipienthost, recipientport, senderhost, senderport, token } = httpResponse.headers;
                const metadata = httpResponse.headers;
                const { httpResponseMessage } = createHttpResponseMessage({ messageStatusCode, Id: null, data,
                    recipientHost: recipienthost, recipientPort: recipientport, metadata, token, senderHost: senderhost, senderPort: senderport,
                });
                await sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: responseMessageQueueType });
            });
        });
        httpRequest.on('error', (error) => console.error(error));
        httpRequest.end(data);
    }});
    Object.defineProperty(this, 'subscribeToHttpResponseMessage', { configurable: false, writable: false, value: ({ callback }) => {
        sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType }).then( async ({ message }) => {
            await callback({ httpResponseMessage: message });
            this.subscribeToHttpResponseMessage({ callback });
        });
    }});
};
HttpClientMessageBus.prototype.publishHttpRequestMessage = function({ httpRequestMessage }) { };
HttpClientMessageBus.prototype.subscribeToHttpResponseMessage = function ({ callback }) { };
module.exports = { HttpClientMessageBus };