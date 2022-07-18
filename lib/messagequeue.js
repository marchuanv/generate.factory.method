const utils = require('utils');

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
        console.log('MessageQueue: Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueHttpResponse', { configurable: false, writable: false, value: ({ httpResponse }) => {
        const data = httpResponse.body;
        const { senderhost, senderport, token } = httpResponse.headers;
        const messageStatusCode = httpResponse.statusCode;
        const { httpResponseMessage } = createHttpResponseMessage({ senderHost: senderhost, senderPort: senderport, userId, data, token, messageStatusCode });
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
MessageQueue.prototype.enqueueRequestMessage = function({ requestMessage }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ responseMessage }) { };
MessageQueue.prototype.dequeueHttpRequestMessage = function () { };
MessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { MessageQueue };