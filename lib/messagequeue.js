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
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({  requestMessage, httpRequest }) => {
        if (httpRequest) {
            const data = httpRequest.body;
            const { senderHost, senderPort, token } = httpRequest.headers;
            const messageStatusCode = httpRequest.statusCode;
            const method = httpRequest.method;
            const path = httpRequest.path;
            const { httpRequestMessage, message } = createHttpRequestMessage({ method, senderHost, senderPort, userId, data, token, messageStatusCode, path });
            requestMessages.push({ httpRequestMessage, requestMessage: message });
        } else if (requestMessage) {
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
        } else {
            throw new Error('enqueueRequestMessage did not queue anything');
        }
        console.log('MessageQueue: Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ responseMessage, httpResponse }) => {
       
        if (httpResponse) {
            const data = httpResponse.body;
            const token = null;
            const { senderHost, senderPort } = httpResponse;
            const messageStatusCode = httpResponse.statusCode;
            const { httpResponseMessage, message } = createHttpResponseMessage({ senderHost, senderPort, userId, data, token, messageStatusCode });
            responseMessages.push({ httpResponseMessage, responseMessage: message });
        } else if (responseMessage) {
            const token = null;
            const senderHost = null;
            const senderPort = null;
            const { code } = responseMessage.getMessageStatus();
            const data = responseMessage.getContent();
            const messageStatusCode = code;
            const { httpResponseMessage } = createHttpResponseMessage({ senderHost, senderPort, userId, data, token, messageStatusCode });
            responseMessages.push({ httpResponseMessage, responseMessage });
        } else {
            throw new Error('enqueueResponseMessage did not queue anything');
        }
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
MessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage, httpRequest }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage, httpResponse }) { };
MessageQueue.prototype.dequeueHttpRequestMessage = function () { };
MessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { MessageQueue };