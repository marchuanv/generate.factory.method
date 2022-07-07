const utils = require('utils');
function MessageQueue() {
    
    const { createMessageConverter } = require('./factory/messageconverter.factory');
    const { createHttpRequestMessage } = require('./factory/httprequestmessage.factory');

    const httpRequestMessages = [];
    const httpResponseMessages = [];

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
    
    Object.defineProperty(this, 'enqueueRawRequest', { configurable: false, writable: false, value: ({ path, headers, method, data }) => {
        console.log('http raw request message queued.');
        httpRequestMessages.push(createHttpRequestMessage({ 
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
            httpRequestMessages.push(httpRequestMessage)
        } else if (httpRequestMessage) {
            httpRequestMessages.push(httpRequestMessage);
        }
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ httpResponseMessage, httpResponse }) => {
        console.log('http response message queued.');
        if (httpResponse) {
            const httpResponseMessage = httpMessageFactory.createHttpResponseMessage({ 
                data: httpResponse.body,
                headers: httpResponse.headers
            });
            httpResponseMessages.push(httpResponseMessage)
        } else if (httpResponseMessage) {
            httpResponseMessages.push(httpResponseMessage);
        }
    }});

    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpRequestMessage', callback: () => {
            return (httpRequestMessages.shift() || { });
        }});
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        return await dequeue({ name: 'httpResponseMessage', callback: () => {
            return (httpResponseMessages.shift() || { });
        }});
    }});
};

MessageQueue.prototype.enqueueRawRequest = function({ path, headers, method, data }) { };
MessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage, httpRequest }) { };
MessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage, httpResponse }) { };
MessageQueue.prototype.dequeueRequestMessage = function () { };
MessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { MessageQueue };