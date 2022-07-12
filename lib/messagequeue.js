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
    Object.defineProperty(this, 'enqueueRawHttpRequest', { configurable: false, writable: false, value: ({ path, headers, method, data }) => {
        const { httpRequestMessage, message } = createHttpRequestMessage({ 
            method,
            path,
            userId,
            data,
            metadata: headers,
            messageStatusCode: 2 // Pending
        })
        requestMessages.push({ httpRequestMessage, requestMessage: message });
        console.log('MessageQueue: Raw Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRawHttpResponse', { configurable: false, writable: false, value: ({ headers, data, httpStatusCode }) => {
        const { httpResponseMessage, message } = createHttpResponseMessage({ 
            userId,
            data,
            metadata: headers,
            messageStatusCode: httpStatusCode
        });
        responseMessages.push({ httpResponseMessage, responseMessage: message});
        console.log('MessageQueue: Raw Http Response Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({  requestMessage, httpRequest }) => {
        if (httpRequest) {
            const { httpRequestMessage, message } = createHttpRequestMessage({
                method: httpRequest.method,
                userId,
                data: httpRequest.body,
                metadata: httpRequest.headers,
                messageStatusCode: 2, // Pending
                path: httpRequest.path
            });
            requestMessages.push({ httpRequestMessage, requestMessage: message });
        } else if (requestMessage) {
            const metadata = requestMessage.getContentMetadata();
            const data = requestMessage.getContent();
            const { code } = requestMessage.getMessageStatus();
            const messageStatusCode = code;
            const method = metadata.method;
            const path = '/';
            const { httpRequestMessage } = createHttpRequestMessage({ method, userId, data, metadata, messageStatusCode, path });
            requestMessages.push({ httpRequestMessage, requestMessage });
        } else {
            throw new Error('enqueueRequestMessage did not queue anything');
        }
        console.log('MessageQueue: Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ responseMessage, httpResponse }) => {
        if (httpResponse) {
            const data = httpResponse.body;
            const metadata = httpResponse.headers;
            const messageStatusCode = httpResponse.statusCode;
            const { httpResponseMessage, message } = createHttpResponseMessage({ userId, data, metadata, messageStatusCode });
            responseMessages.push({ httpResponseMessage, responseMessage: message });
        } else if (responseMessage) {
            const metadata = responseMessage.getContentMetadata();
            const { code } = responseMessage.getMessageStatus();
            const data = responseMessage.getContent();
            const { httpResponseMessage } = createHttpResponseMessage({ userId, data, metadata, messageStatusCode: code });
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

MessageQueue.prototype.enqueueRawHttpRequest = function({ path, headers, method, data }) { };
MessageQueue.prototype.enqueueRawHttpResponse = function({ headers, data, httpStatusCode }) { };
MessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage, httpRequest }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage, httpResponse }) { };
MessageQueue.prototype.dequeueHttpRequestMessage = function () { };
MessageQueue.prototype.dequeueHttpResponseMessage = function () { };

module.exports = { MessageQueue };