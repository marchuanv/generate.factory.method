const utils = require('utils');
const { createMessage } = require('./factory/message.factory');

function dequeue({ name, queue }) {
    return new Promise((resolve) => {
        const id = setInterval( async () => {
            const object = (queue.shift() || { });
            if (!utils.isEmptyObject(object) && object[name]) {
                clearInterval(id);
                resolve(object);                  
            }
        },1000);
    });
}

function MessageQueue({ userId }) {
    
    const { createHttpRequestMessage } = require('./factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('./factory/httpresponsemessage.factory');

    const requestMessages = [];
    const httpRequestMessages = [];
    const responseMessages = [];
    const httpResponseMessages = [];
    
    Object.defineProperty(this, 'enqueueRawHttpRequest', { configurable: false, writable: false, value: ({ path, method, senderHost, senderPort, data }) => {
        const { httpRequestMessage } = createHttpRequestMessage({ method, senderHost, senderPort, userId, data, token: null, messageStatusCode: 2, path });
        httpRequestMessages.push({ httpRequestMessage });
        console.log('MessageQueue: Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRawHttpResponse', { configurable: false, writable: false, value: ({ senderHost, senderPort, data, httpStatusCode }) => {
        const { httpResponseMessage } = createHttpResponseMessage({ senderHost, senderPort, userId, data, token: null, messageStatusCode: httpStatusCode });
        httpResponseMessages.push({ httpResponseMessage });
        console.log('MessageQueue: Http Response Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueHttpRequest', { configurable: false, writable: false, value: ({  httpRequest }) => {
        const data = httpRequest.body;
        const { senderhost, senderport, token } = httpRequest.headers;
        const messageStatusCode = 2;
        const method = httpRequest.method;
        const path = httpRequest.url;
        const { httpRequestMessage } = createHttpRequestMessage({ method, senderHost: senderhost, senderPort: senderport, userId, data, token, messageStatusCode, path });
        httpRequestMessages.push({ httpRequestMessage });
        console.log('MessageQueue: Http Request Queued.');
    }});
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: ({ httpResponse }) => {
        const data = httpResponse.body;
        const { senderhost, senderport, token } = httpResponse.headers;
        const messageStatusCode = httpResponse.statusCode;
        const { httpResponseMessage } = createHttpResponseMessage({ senderHost: senderhost, senderPort: senderport, userId, data, token, messageStatusCode });
        httpResponseMessages.push({ httpResponseMessage });
        console.log('MessageQueue: Http Response Queued.');
    }});
    Object.defineProperty(this, 'enqueueHttpRequestMessage', { configurable: false, writable: false, value: ({  requestMessage }) => {
        const { senderHost, senderPort } = requestMessage.getSenderAddress();
        const { path, method } = requestMessage.getContentMetadata();
        const data = requestMessage.getContent();
        const token = null;
        const messageStatusCode = 2;
        const { httpRequestMessage } = createHttpRequestMessage({ method, senderHost, senderPort, userId, data, token, messageStatusCode, path });
        httpRequestMessages.push({ httpRequestMessage });
        console.log('MessageQueue: Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueHttpResponseMessage', { configurable: false, writable: false, value: ({ responseMessage }) => {
        const { senderHost, senderPort } = responseMessage.getSenderAddress();
        const { token } = responseMessage.getContentMetadata();
        const data = responseMessage.getContent();
        const messageStatusCode = 2;
        const { httpResponseMessage } = createHttpResponseMessage({ senderHost, senderPort, userId, data, token, messageStatusCode });
        httpResponseMessages.push({ httpResponseMessage });
        console.log('MessageQueue: Http Response Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({  requestMessage }) => {
        requestMessages.push({ requestMessage });
        console.log('MessageQueue: Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ responseMessage }) => {
        responseMessages.push({ responseMessage });
        console.log('MessageQueue: Response Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRequestMessageConvert', { configurable: false, writable: false, value: ({  httpRequestMessage }) => {
        const messageStatusCode = 2;
        const data = httpRequestMessage.getContent();
        const { token, senderhost, senderoort } = httpResponseMessage.getHeaders();
        const { message } = createMessage({ senderHost: senderhost, senderPort: senderoort, userId, data, token, metadata: {}, messageStatusCode });
        requestMessages.push({ requestMessage: message });
        console.log('MessageQueue: Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueResponseMessageConvert', { configurable: false, writable: false, value: ({ httpResponseMessage }) => {
        const { token, senderhost, senderoort } = httpResponseMessage.getHeaders();
        const messageStatusCode = httpResponseMessage.getStatusCode();
        const data = httpResponseMessage.getContent();
        const metadata = httpResponseMessage.getContentMetadata();
        const { responseMessage } = createMessage({ senderHost: senderhost, senderPort: senderoort, userId, data, token, metadata, messageStatusCode });
        responseMessages.push({ responseMessage });
        console.log('MessageQueue: Response Message Queued.');
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpRequestMessage', queue: httpRequestMessages });
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpResponseMessage', queue: httpResponseMessages });
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'requestMessage', queue: requestMessages });
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'responseMessage', queue: responseMessages });
    }});
};

MessageQueue.prototype.enqueueRawHttpRequest = function({ path, method, senderHost, senderPort, data }) { };
MessageQueue.prototype.enqueueRawHttpResponse = function({ senderHost, senderPort, data, httpStatusCode }) { };
MessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
MessageQueue.prototype.enqueueHttpResponse = function({ httpResponse }) { };
MessageQueue.prototype.enqueueHttpRequestMessage = function({ requestMessage }) { };
MessageQueue.prototype.enqueueHttpResponseMessage = function({ responseMessage }) { };
MessageQueue.prototype.enqueueRequestMessage = function({ requestMessage }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ responseMessage }) { };
MessageQueue.prototype.enqueueRequestMessageConvert = function({ httpRequestMessage }) { };
MessageQueue.prototype.enqueueResponseMessageConvert = function({ httpResponseMessage }) { };
MessageQueue.prototype.dequeueHttpRequestMessage = function () { };
MessageQueue.prototype.dequeueHttpResponseMessage = function () { };
MessageQueue.prototype.dequeueRequestMessage = function () { };
MessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { MessageQueue };