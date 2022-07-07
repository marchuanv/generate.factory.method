const utils = require('utils');
function MessageQueue() {
    
    const { createMessageConverter } = require('./factory/messageconverter.factory');
    const { createHttpRequestMessage } = require('./factory/httprequestmessage.factory');

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
        console.log('http raw request message queued.');
        requestMessages.push(createHttpRequestMessage({ 
            method,
            path,
            userId: 'bob',
            data,
            metadata: headers,
            messageStatusCode: 2
        }));
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({ httpRequestMessage, httpRequest }) => {
        console.log('http request message queued.');
        if (httpRequest) {
            const httpRequestMessage = this.factory.httpmessagefactory.createHttpRequestMessage({ 
                data: httpRequest.body,
                headers: httpRequest.headers,
                method: httpRequest.method, 
                path: httpRequest.path
            });
            requestMessages.push(httpRequestMessage)
        } else if (httpRequestMessage) {
            requestMessages.push(httpRequestMessage);
        }
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ httpResponseMessage, httpResponse }) => {
        console.log('http response message queued.');
        if (httpResponse) {
            const httpResponseMessage = httpMessageFactory.createHttpResponseMessage({ 
                data: httpResponse.body,
                headers: httpResponse.headers
            });
            responseMessages.push(httpResponseMessage)
        } else if (httpResponseMessage) {
            responseMessages.push(httpResponseMessage);
        }
    }});

    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpRequestMessage', callback: () => {
            return (requestMessages.shift() || { });
        }});
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpResponseMessage', callback: () => {
            return (responseMessages.shift() || { });
        }});
    }});
};

MessageQueue.prototype.enqueueRawHttpRequest = function({ path, headers, method, data }) { };
MessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage, httpRequest }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage, httpResponse }) { };
MessageQueue.prototype.dequeueRequestMessage = function () { };
MessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { MessageQueue };