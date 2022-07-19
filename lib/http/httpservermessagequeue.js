const utils = require('utils');

function HttpServerMessageQueue({ userId, senderAddress, recipientAddress }) {

    this.Id = utils.generateGUID();
    
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    const httpRequestMessages = [];
    const httpResponseMessages = [];
    const otherServerQueues = [];

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
        httpRequestMessages.push({ httpRequestMessage });
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
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        return new Promise((resolve) => {
            console.log(`HttpServerMessageQueue(dequeueHttpRequestMessage): Dequeuing Http Request Message From Queue (${this.Id})`);
            const { httpRequestMessage } = httpRequestMessages.shift() || {};
            if (utils.isEmptyObject(httpRequestMessage) || !httpRequestMessage) {
                for(const otherServerQueue of otherServerQueues) {
                    console.log(`HttpServerMessageQueue(dequeueHttpRequestMessage): Dequeuing Http Request Message From Sync Queue (${otherServerQueue.Id})`);
                    const { httpRequestMessage } = otherServerQueue.cloneRequestMessages().shift() || {};
                    if (!utils.isEmptyObject(httpRequestMessage) && httpRequestMessage) {
                        return resolve({ httpRequestMessage });
                    }
                }
                if (otherServerQueues.length === 0) {
                    setTimeout(async () => {
                        const { httpRequestMessage } = await this.dequeueHttpRequestMessage();
                        if (httpRequestMessage) {
                            return resolve({ httpRequestMessage });
                        }
                    },2000);
                }
            } else {
                resolve({ httpRequestMessage });        
            }
        });
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        return new Promise((resolve) => {
            console.log(`HttpServerMessageQueue(dequeueHttpResponseMessage): Dequeuing Http Response Message From Queue (${this.Id})`);
            const { httpResponseMessage } = httpResponseMessages.shift() || {};
            if (utils.isEmptyObject(httpResponseMessage) || !httpResponseMessage) {
                for(const otherServerQueue of otherServerQueues) {
                    console.log(`HttpServerMessageQueue(dequeueHttpResponseMessage): Dequeuing Http Response Message From Sync Queue (${otherServerQueue.Id})`);
                    const { httpResponseMessage } = otherServerQueue.cloneResponseMessages().shift() || {};
                    if (!utils.isEmptyObject(httpResponseMessage) && httpResponseMessage) {
                        return resolve({ httpResponseMessage });
                    }
                }
                if (otherServerQueues.length === 0) {
                    setTimeout(async () => {
                        const { httpResponseMessage } = await this.dequeueHttpResponseMessage();
                        if (httpResponseMessage) {
                            return resolve({ httpResponseMessage });
                        }
                    },2000);
                }
            } else {
                return resolve({ httpResponseMessage });        
            }
        });
    }});
    Object.defineProperty(this, 'sync', { configurable: false, writable: false, value: ({ httpServerMessageQueue }) => {
        if (httpServerMessageQueue && !otherServerQueues.find(q => q.Id === httpServerMessageQueue.Id)) {
            otherServerQueues.push(httpServerMessageQueue);
            httpServerMessageQueue.sync({ httpServerMessageQueue: this });
        }
    }});
    Object.defineProperty(this, 'cloneRequestMessages', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(httpRequestMessages));
    }});
    Object.defineProperty(this, 'cloneResponseMessages', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(httpResponseMessages));
    }});
};

HttpServerMessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
HttpServerMessageQueue.prototype.enqueueHttpResponseMessage = function({ responseMessage }) { };
HttpServerMessageQueue.prototype.dequeueHttpRequestMessage = function () { };
HttpServerMessageQueue.prototype.dequeueHttpResponseMessage = function () { };
HttpServerMessageQueue.prototype.merge = function({ httpServerMessageQueue }) { };
HttpServerMessageQueue.prototype.cloneRequestMessages = function() { };
HttpServerMessageQueue.prototype.cloneResponseMessages = function() { };
module.exports = { HttpServerMessageQueue };