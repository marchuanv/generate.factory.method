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
                    const obj = {};
                    obj[name] = object;
                    resolve(obj);
                }
            },1000);
        });
    }
    Object.defineProperty(this, 'enqueueRawHttpRequest', { configurable: false, writable: false, value: ({ path, headers, method, data }) => {
        const { httpRequestMessage } = createHttpRequestMessage({ 
            method,
            path,
            userId,
            data,
            metadata: headers,
            messageStatusCode: 2 // Pending
        })
        requestMessages.push(httpRequestMessage);
        console.log('MessageQueue: Raw Http Request Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRawHttpResponse', { configurable: false, writable: false, value: ({ headers, data, httpStatusCode }) => {
        const { httpResponseMessage } = createHttpResponseMessage({ 
            userId,
            data,
            metadata: headers,
            messageStatusCode: httpStatusCode
        });
        responseMessages.push(httpResponseMessage);
        console.log('MessageQueue: Raw Http Response Message Queued.');
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({ httpRequestMessage, httpRequest }) => {
        if (httpRequest) {
            const { httpRequestMessage } = createHttpRequestMessage({
                method: httpRequest.method, 
                userId,
                data: httpRequest.body,
                metadata: httpRequest.headers,
                messageStatusCode: 2, // Pending
                path: httpRequest.path
            });
            requestMessages.push(httpRequestMessage)
        } else if (httpRequestMessage) {
            requestMessages.push(httpRequestMessage);
        }
        console.log('request message queued.');
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ httpResponseMessage, httpResponse }) => {
        if (httpResponse) {
            const { httpResponseMessage } = createHttpResponseMessage({
                userId,
                data: httpResponse.body,
                metadata: httpResponse.headers,
                messageStatusCode: httpResponse.statusCode
            });
            responseMessages.push(httpResponseMessage)
        } else if (httpResponseMessage) {
            responseMessages.push(httpResponseMessage);
        }
        console.log('response message queued.');
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