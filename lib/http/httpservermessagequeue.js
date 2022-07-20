function HttpServerMessageQueue({ sharedMessageQueue, userId, senderAddress, recipientAddress }) {

    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    Object.defineProperty(this, 'enqueueHttpRequest', { configurable: false, writable: false, value: ({ httpRequest }) => {
        const data = httpRequest.body;
        const { token } = httpRequest.headers;
        const { path, method } = httpRequest;
        const metadata = httpRequest.headers;
        const messageStatusCode = 2;
        const { httpRequestMessage } = createHttpRequestMessage({
            method,
            recipientHost,
            recipientPort,
            userId, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode,
            path
        });
        sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: 'HttpServerRequestMessage' });
    }});
    Object.defineProperty(this, 'enqueueHttpResponseMessage', { configurable: false, writable: false, value: ({ responseMessage }) => {
        const { senderHost, senderPort } = responseMessage.getSenderAddress();
        const token = responseMessage.getToken();
        const data = responseMessage.getContent();
        const { code } = responseMessage.getMessageStatus();
        const metadata = responseMessage.getContentMetadata();
        const messageStatusCode = code;
        const { httpResponseMessage } = createHttpResponseMessage({
            recipientHost,
            recipientPort,
            userId, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode
        });
        sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: 'HttpServerResponseMessage' });
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'HttpServerRequestMessage' });
        return { httpRequestMessage: message };
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'HttpServerResponseMessage' });
        return { httpResponseMessage: message };
    }});
};

HttpServerMessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
HttpServerMessageQueue.prototype.enqueueHttpResponseMessage = function({ responseMessage }) { };
HttpServerMessageQueue.prototype.dequeueHttpRequestMessage = function () { };
HttpServerMessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { HttpServerMessageQueue };