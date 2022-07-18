const utils = require('utils');

function dequeueHttpRequestMessage({ httpRequestMessages, otherClientQueues }) {
    return new Promise(async(resolve) => {
        const { httpRequestMessage } = httpRequestMessages.shift() || {};
        if (utils.isEmptyObject(httpRequestMessage) || !httpRequestMessage) {
            for(const otherServerQueue of otherClientQueues) {
                const { httpRequestMessage } = await dequeueHttpRequestMessage({ httpRequestMessages: otherServerQueue.cloneRequestMessages(), otherClientQueues: [] });
                if (httpRequestMessage) {
                    return resolve({ httpRequestMessage });
                }
            }
            if (otherClientQueues.length === 0) {
                setTimeout(async () => {
                    const { httpRequestMessage } = await dequeueHttpRequestMessage({ httpRequestMessages, otherClientQueues });
                    if (httpRequestMessage) {
                        return resolve({ httpRequestMessage });
                    }
                },1000);
            }
        } else {
            resolve({ httpRequestMessage });        
        }
    });
}

function dequeueHttpResponseMessage({ httpResponseMessages, otherClientQueues }) {
    return new Promise(async(resolve) => {
        const { httpResponseMessage } = httpResponseMessages.shift() || {};
        if (utils.isEmptyObject(httpResponseMessage) || !httpResponseMessage) {
            for(const otherServerQueue of otherClientQueues) {
                const { httpResponseMessage } = await dequeueHttpResponseMessage({ httpResponseMessages: otherServerQueue.cloneResponseMessages(), otherClientQueues: [] });
                if (httpResponseMessage) {
                    return resolve({ httpResponseMessage });
                }
            }
            if (otherClientQueues.length === 0) {
                setTimeout(async () => {
                    const { httpResponseMessage } = await dequeueHttpResponseMessage({ httpResponseMessages, otherClientQueues });
                    if (httpResponseMessage) {
                        return resolve({ httpResponseMessage });
                    }
                },1000);
            }
        } else {
            return resolve({ httpResponseMessage });        
        }
    });
}

function HttpClientMessageQueue({ userId, senderAddress, recipientAddress }) {
    
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
        return await dequeueHttpRequestMessage({ httpRequestMessages, otherClientQueues });
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeueHttpResponseMessage({ httpResponseMessages, otherClientQueues });
    }});
    Object.defineProperty(this, 'sync', { configurable: false, writable: false, value: ({ httpClientMessageQueue }) => {
       otherClientQueues.push(httpClientMessageQueue);
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