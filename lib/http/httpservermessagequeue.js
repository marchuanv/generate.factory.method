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

function HttpServerMessageQueue({ userId, senderAddress }) {
    
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    const httpRequestMessages = [];
    const httpResponseMessages = [];

    Object.defineProperty(this, 'enqueueHttpRequest', { configurable: false, writable: false, value: ({ httpRequest }) => {
        const data = httpRequest.body;
        const { token } = httpRequest.headers;
        const { path, method } = httpRequest;
        const metadata = httpRequest.headers;
        const messageStatusCode = 2;
        const { httpResponseMessage } = createHttpRequestMessage({
            method,
            recipientHost,
            recipientPort,
            userId, data,
            senderHost, senderPort,
            token, metadata,
            messageStatusCode,
            path
        });
        httpResponseMessages.push({ httpResponseMessage });
        console.log('MessageQueue: Http Response Queued.');
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
        httpResponseMessages.push({ httpResponseMessage });
        console.log('MessageQueue: Http Response Message Queued.');
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpRequestMessage', queue: httpRequestMessages });
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpResponseMessage', queue: httpResponseMessages });
    }});
};

HttpServerMessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
HttpServerMessageQueue.prototype.enqueueHttpResponseMessage = function({ responseMessage }) { };
HttpServerMessageQueue.prototype.dequeueHttpRequestMessage = function () { };
HttpServerMessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { HttpServerMessageQueue };