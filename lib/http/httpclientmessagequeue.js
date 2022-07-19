const utils = require('utils');

function HttpClientMessageQueue({ userId, senderAddress, recipientAddress }) {
    
    this.Id = utils.generateGUID();

    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    const httpRequestMessages = [];
    const httpResponseMessages = [];
    const otherClientQueues = [];
    
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
        httpResponseMessages.push({ httpResponseMessage });
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
        httpRequestMessages.push({ httpRequestMessage });
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        return new Promise(async(resolve) => {
            console.log(`HttpClientMessageQueue(dequeueHttpRequestMessage): Dequeuing Http Request Message From Queue (${this.Id})`);
            const { httpRequestMessage } = httpRequestMessages.shift() || {};
            if (utils.isEmptyObject(httpRequestMessage) || !httpRequestMessage) {
                for(const otherClientQueue of otherClientQueues) {
                    console.log(`HttpClientMessageQueue(dequeueHttpRequestMessage): Dequeuing Http Request Message From Sync Queue (${otherClientQueue.Id})`);
                    const { httpRequestMessage } = otherClientQueue.cloneRequestMessages().shift() || {};
                    if (!utils.isEmptyObject(httpRequestMessage) && httpRequestMessage) {
                        return resolve({ httpRequestMessage });
                    }
                }
                if (otherClientQueues.length === 0) {
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
        return new Promise(async(resolve) => {
            console.log(`HttpClientMessageQueue(dequeueHttpResponseMessage): Dequeuing Http Response Message From Queue (${this.Id})`);
            const { httpResponseMessage } = httpResponseMessages.shift() || {};
            if (utils.isEmptyObject(httpResponseMessage) && !httpResponseMessage) {
                for(const otherClientQueue of otherClientQueues) {
                    console.log(`HttpClientMessageQueue(dequeueHttpResponseMessage): Dequeuing Http Response Message From Sync Queue (${otherClientQueue.Id})`);
                    const { httpResponseMessage } = otherClientQueue.cloneResponseMessages().shift() || {};
                    if (!utils.isEmptyObject(httpResponseMessage) || httpResponseMessage) {
                        return resolve({ httpResponseMessage });
                    }
                }
                if (otherClientQueues.length === 0) {
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
    Object.defineProperty(this, 'sync', { configurable: false, writable: false, value: ({ httpClientMessageQueue }) => {
        if (httpClientMessageQueue && !otherClientQueues.find(q => q.Id === httpClientMessageQueue.Id)) {
            otherClientQueues.push(httpClientMessageQueue);
            httpClientMessageQueue.sync({ httpClientMessageQueue: this });
        }
    }});
    Object.defineProperty(this, 'cloneRequestMessages', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(httpRequestMessages));
    }});
    Object.defineProperty(this, 'cloneResponseMessages', { configurable: false, writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(httpResponseMessages));
    }});
};

HttpClientMessageQueue.prototype.enqueueHttpRequest = function({ httpRequest }) { };
HttpClientMessageQueue.prototype.enqueueHttpResponse = function({ httpResponse }) { };
HttpClientMessageQueue.prototype.enqueueHttpRequestMessage = function({ requestMessage }) { };
HttpClientMessageQueue.prototype.enqueueHttpResponseMessage = function({ responseMessage }) { };
HttpClientMessageQueue.prototype.dequeueHttpRequestMessage = function () { };
HttpClientMessageQueue.prototype.dequeueHttpResponseMessage = function () { };
HttpClientMessageQueue.prototype.merge = function({ httpClientMessageQueue }) { };
HttpClientMessageQueue.prototype.cloneRequestMessages = function() { };
HttpClientMessageQueue.prototype.cloneResponseMessages = function() { };

module.exports = { HttpClientMessageQueue };