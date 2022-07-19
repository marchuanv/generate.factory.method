function HttpServerMessageQueue({ messageQueue, userId, senderAddress, recipientAddress }) {

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
        messageQueue.queueMessage({ message: httpRequestMessage, messageType: 'HttpRequestMessage' });
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
        messageQueue.queueMessage({ message: httpResponseMessage, messageType: 'HttpResponseMessage' });
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await messageQueue.dequeueMessage({ messageType: 'HttpRequestMessage' });
        return { httpRequestMessage: message };
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await messageQueue.dequeueMessage({ messageType: 'HttpResponseMessage' });
        return { httpResponseMessage: message };
    }});
};

HttpServerMessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
HttpServerMessageQueue.prototype.enqueueHttpResponseMessage = function({ responseMessage }) { };
HttpServerMessageQueue.prototype.dequeueHttpRequestMessage = function () { };
HttpServerMessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { HttpServerMessageQueue };