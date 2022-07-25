function HttpClientMessageQueue({ sharedMessageQueue, userId, senderAddress, recipientAddress }) {
    
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;
    
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: ({ httpResponse, refId }) => {
        const data = httpResponse.body;
        const { token } = httpResponse.headers;
        const messageStatusCode = httpResponse.statusCode;
        const metadata = httpResponse.headers;
        const { httpResponseMessage } = createHttpResponseMessage({
            recipientHost, recipientPort,
            userId, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode
        });
        sharedMessageQueue.queueMessage({ message: httpResponseMessage, messageQueueType: 'HttpClientResponseMessage', refId });
        return { refId };
    }});
    Object.defineProperty(this, 'enqueueHttpRequestMessage', { configurable: false, writable: false, value: ({ requestMessage, refId }) => {
        const { path, method } = requestMessage.getContentMetadata();
        const data = requestMessage.getContent();
        const token = requestMessage.getToken();
        const { code } = requestMessage.getMessageStatus();
        const messageStatusCode = code;
        const Id = requestMessage.getId();
        const { httpRequestMessage } = createHttpRequestMessage({ 
            method, recipientHost, recipientPort, Id,
            userId, data, senderHost, senderPort,
            token, metadata: {}, messageStatusCode, path
        });
        sharedMessageQueue.queueMessage({ message: httpRequestMessage, messageQueueType: 'HttpClientRequestMessage', refId });
        return { refId };
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, refId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'HttpClientRequestMessage' });
        return { httpRequestMessage: message, refId };
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, refId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'HttpClientResponseMessage' });
        return { httpResponseMessage: message, refId };
    }});
};

HttpClientMessageQueue.prototype.enqueueHttpResponse = function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = function({ requestMessage }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { HttpClientMessageQueue };