const utils = require('utils');
function MessageQueue({ userId }) {
    
    const { createHttpRequestMessage } = require('./factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('./factory/httpresponsemessage.factory');

    const requestMessages = [];
    const responseMessages = [];

    function dequeue({ name, callback }) {
        return new Promise((resolve) => {
            const id = setInterval( async () => {
                const object = await callback();
                if (!utils.isEmptyObject(object) ) {
                    clearInterval(id);
                    resolve(object);                  
                }
            },1000);
        });
    }
    Object.defineProperty(this, 'enqueueRawHttpRequest', { configurable: false, writable: false, value: ({ path, method, senderHost, senderPort, data }) => {
        const { httpRequestMessage, message } = createHttpRequestMessage({ method, senderHost, senderPort, userId, data, token: null, messageStatusCode: 2, path });
        requestMessages.push({ httpRequestMessage, requestMessage: message });
        console.log('MessageQueue: Raw Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRawHttpResponse', { configurable: false, writable: false, value: ({ senderHost, senderPort, data, httpStatusCode }) => {
        const { httpResponseMessage, message } = createHttpResponseMessage({ senderHost, senderPort, userId, data, token: null, messageStatusCode: httpStatusCode });
        responseMessages.push({ httpResponseMessage, responseMessage: message});
        console.log('MessageQueue: Raw Http Response Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueHttpRequest', { configurable: false, writable: false, value: ({  httpRequest }) => {
        const data = httpRequest.body;
        const { senderhost, senderport, token } = httpRequest.headers;
        const messageStatusCode = 2;
        const method = httpRequest.method;
        const path = httpRequest.url;
        const { httpRequestMessage, message } = createHttpRequestMessage({ method, senderHost: senderhost, senderPort: senderport, userId, data, token, messageStatusCode, path });
        requestMessages.push({ httpRequestMessage, requestMessage: message });
        console.log('MessageQueue: Raw Http Request Queued.');
    }});
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: ({ httpResponse }) => {
        const data = httpResponse.body;
        const { senderhost, senderport, token } = httpResponse.headers;
        const messageStatusCode = httpResponse.statusCode;
        const { httpResponseMessage, message } = createHttpResponseMessage({ senderHost: senderhost, senderPort: senderport, userId, data, token, messageStatusCode });
        responseMessages.push({ httpResponseMessage, responseMessage: message });
        console.log('MessageQueue: Raw Http Response Queued.');
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({  requestMessage }) => {
        const { senderHost, senderPort } = requestMessage.getSenderAddress();
        const metadata = requestMessage.getContentMetadata();
        const data = requestMessage.getContent();
        const { code } = requestMessage.getMessageStatus();
        const messageStatusCode = code;
        const method = metadata.method;
        const path = requestMessage.getId();
        const token = requestMessage.getToken();
        const { httpRequestMessage } = createHttpRequestMessage({ method, senderHost, senderPort, userId, data, token, messageStatusCode, path });
        requestMessages.push({ httpRequestMessage, requestMessage });
        console.log('MessageQueue: Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ responseMessage, httpResponse }) => {
        const token = responseMessage.getToken();
        const { senderHost, senderPort } = responseMessage.getSenderAddress();
        const { code } = responseMessage.getMessageStatus();
        const data = responseMessage.getContent();
        const messageStatusCode = code;
        const { httpResponseMessage } = createHttpResponseMessage({ senderHost, senderPort, userId, data, token, messageStatusCode });
        responseMessages.push({ httpResponseMessage, responseMessage });
        console.log('MessageQueue: Http Response Message Queued.');
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpRequestMessage', callback: () => {
            return (requestMessages.shift() || { });
        }});
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpResponseMessage', callback: () => {
            return (responseMessages.shift() || { });
        }});
    }});
};

MessageQueue.prototype.enqueueRawHttpRequest = function({ path, method, senderHost, senderPort, data }) { };
MessageQueue.prototype.enqueueRawHttpResponse = function({ senderHost, senderPort, data, httpStatusCode }) { };
MessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
MessageQueue.prototype.enqueueHttpResponse = function({ httpResponse }) { };
MessageQueue.prototype.enqueueRequestMessage = function({ requestMessage }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ responseMessage }) { };
MessageQueue.prototype.dequeueHttpRequestMessage = function () { };
MessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { MessageQueue };