const http = require("http");
function HttpClientMessageBus({ messageQueue, messageConverter, logger, contextId, timeout }) {
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');
    const responseQueueName = `${contextId}_HttpClientResponses`;
    const requestQueueName = `${contextId}_HttpClientRequests`;
    messageQueue.bind({ queueName: responseQueueName });
    messageQueue.bind({ queueName: requestQueueName });
    Object.defineProperty(this, 'publishHttpRequestMessage', { configurable: false, writable: false, value: ({ httpRequestMessage }) => {
        messageQueue.queueMessage({ message: httpRequestMessage, queueName: requestQueueName });
        messageQueue.dequeueMessage({ queueName: requestQueueName }).then( async ({ message }) => {
            const httpRequestMessage = message;
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
                    const { message } = messageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage });
                    await messageQueue.queueMessage({ message, queueName: responseQueueName });
                });
            });
            httpRequest.on('error', (error) => console.error(error));
            httpRequest.end(data);
        });
    }});
    Object.defineProperty(this, 'subscribeToHttpResponseMessages', { configurable: false, writable: false, value: ({ callback }) => {
        messageQueue.dequeueMessage({ queueName: responseQueueName }).then( async ({ message }) => {
            await callback({ httpResponseMessage: message });
            this.subscribeToHttpResponseMessages({ callback });
        });
    }});
};
HttpClientMessageBus.prototype.publishHttpRequestMessage = function({ httpRequestMessage }) { };
HttpClientMessageBus.prototype.subscribeToHttpResponseMessages = function ({ callback }) { };
module.exports = { HttpClientMessageBus };
