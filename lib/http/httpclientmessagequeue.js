function HttpClientMessageQueue({ messageQueue, userId, senderAddress, recipientAddress }) {
    
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;
    
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: ({ httpResponse }) => {
        const data = httpResponse.body;
        const { token } = httpResponse.headers;
        const messageStatusCode = httpResponse.statusCode;
        const metadata = httpResponse.headers;
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
    Object.defineProperty(this, 'enqueueHttpRequestMessage', { configurable: false, writable: false, value: ({ requestMessage }) => {
        const { path, method } = requestMessage.getContentMetadata();
        const data = requestMessage.getContent();
        const token = requestMessage.getToken();
        const { code } = requestMessage.getMessageStatus();
        const messageStatusCode = code;
        const { httpRequestMessage } = createHttpRequestMessage({ 
            method, recipientHost, recipientPort,
            userId, data, senderHost, senderPort,
            token, metadata: {}, messageStatusCode, path
        });
        messageQueue.queueMessage({ message: httpRequestMessage, messageType: 'HttpRequestMessage' });
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await messageQueue.dequeueMessage({ messageType: 'HttpRequestMessage' });
        return { httpRequestMessage: message };
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await messageQueue.dequeueMessage({ messageType: 'HttpResponseMessage' });
        return { httpResponseMessage: message };
    }});
    Object.defineProperty(this, 'sync', { configurable: false, writable: false, value: ({ httpClientMessageQueue }) => {
        messageQueue.enableSync();
        httpClientMessageQueue.enableSync();
    }});
};

HttpClientMessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
HttpClientMessageQueue.prototype.enqueueHttpResponse = function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = function({ requestMessage }) { };
HttpClientMessageQueue.prototype.enqueueHttpResponseMessage = function({ responseMessage }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { HttpClientMessageQueue };