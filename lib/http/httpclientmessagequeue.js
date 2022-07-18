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

function HttpClientMessageQueue({ userId, senderAddress, recipientAddress }) {
    
    const { createHttpRequestMessage } = require('../factory/httprequestmessage.factory');
    const { createHttpResponseMessage } = require('../factory/httpresponsemessage.factory');

    const { senderHost, senderPort } = senderAddress;
    const { recipientHost, recipientPort } = recipientAddress;

    let httpRequestMessages = [];
    let httpResponseMessages = [];
    let isSync = false;
    
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
        console.log('MessageQueue: Http Response Queued.');
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
            token: null, metadata: {}, messageStatusCode, path
        });
        httpRequestMessages.push({ httpRequestMessage });
        console.log('MessageQueue: Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'dequeueHttpRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpRequestMessage', queue: httpRequestMessages });
    }});
    Object.defineProperty(this, 'dequeueHttpResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpResponseMessage', queue: httpResponseMessages });
    }});
    Object.defineProperty(this, 'sync', { configurable: false, writable: false, value: ({ httpClientMessageQueue }) => {
        if (isSync) {
            return;
        }
        isSync = true;
        httpClientMessageQueue.sync({ httpClientMessageQueue: this });
        setInterval(() => {
            const httpRequestMessagesCloned = httpClientMessageQueue.cloneRequestMessages();
            httpRequestMessages = httpRequestMessages.concat(httpRequestMessagesCloned);
            const httpResponseMessagesCloned = httpClientMessageQueue.cloneResponseMessages();
            httpResponseMessages = httpResponseMessages.concat(httpResponseMessagesCloned);
        }, 1000);
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