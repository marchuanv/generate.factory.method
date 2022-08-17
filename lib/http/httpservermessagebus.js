function HttpServerMessageBus({ sharedMessageQueue, sharedHttpServer, contextId }) {
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const requestQueueName = `${contextId}_HttpServerRequests`;
    const responseQueueName = `${contextId}_HttpServerResponses`;
    sharedMessageQueue.bind({ queueName: requestQueueName });
    sharedMessageQueue.bind({ queueName: responseQueueName });
    sharedHttpServer.receiveRequest({ callback: async ({ body, headers, path }) => {
        let { recipienthost, recipientport, senderhost, senderport, token } = headers;
        recipientport = isNaN(recipientport) ? recipientport : Number(recipientport);
        senderport = isNaN(senderport) ? senderport : Number(senderport);
        const metadata = headers;
        metadata['recipientport'] = recipientport;
        metadata['senderport'] = senderport;
        if (path) {
            metadata.path = path;
        }
        const messageStatusCode = 2;
        const { httpRequestMessage } = createHttpRequestMessage({ messageStatusCode, Id: null, data: body, recipientHost: recipienthost,
            recipientPort: recipientport, metadata, token, senderHost: senderhost, senderPort: senderport
        });
        await sharedMessageQueue.queueMessage({ message: httpRequestMessage, queueName: requestQueueName });
        const { message } = await sharedMessageQueue.dequeueMessage({ queueName: responseQueueName });
        return {
            headers: message.getHeaders(),
            statusMessage:  message.getStatusMessage(),
            statusCode:  message.getStatusCode(),
            body: message.getEncryptedContent()
        };
    }});
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
