const { HttpMessageFactory } = require('../http/httpmessagefactory');
const utils = require('utils');
function HttpMessageQueue({ httpMessageFactory }) {
    
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }

    const httpRequestMessages = [];
    const httpResponseMessages = [];
    const httpRequests = [];
    const httpResponses = [];

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
    
    Object.defineProperty(this, 'enqueueRawRequest', { writable: false, value: ({ path, headers, method, data }) => {
        console.log('http raw request message queued.');
        const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ data, headers, method, path });
        httpRequestMessages.push(httpRequestMessage);
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { writable: false, value: ({ httpRequestMessage }) => {
        console.log('http request message queued.');
        httpRequestMessages.push(httpRequestMessage);
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { writable: false, value: ({ httpResponseMessage }) => {
        console.log('http response message queued.');
        httpResponseMessages.push(httpResponseMessage);
    }});
    Object.defineProperty(this, 'enqueueRequest', { writable: false, value: ({ httpRequest }) => {
        console.log('http request queued.');
        httpRequests.push(httpRequest);
    }});
    Object.defineProperty(this, 'enqueueResponse', { writable: false, value: ({ httpResponse }) => {
        console.log('http response queued.');
        httpResponses.push(httpResponse);
    }});
    
    Object.defineProperty(this, 'dequeueRequest', { writable: false, value: async () => {
        return await dequeue({ name: 'httpRequest', callback: () => {
            return (httpRequests.shift() || { });
        }});
    }});
    Object.defineProperty(this, 'dequeueResponse', { writable: false, value: async () => {
        return await dequeue({ name: 'httpResponse', callback: () => {
            return (httpResponses.shift() || { });
        }});
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { writable: false, value: async () => {
        return await dequeue({ name: 'httpRequestMessage', callback: () => {
            return (httpRequestMessages.shift() || { });
        }});
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { writable: false, value: async () => {
        return await dequeue({ name: 'httpResponseMessage', callback: () => {
            return (httpResponseMessages.shift() || { });
        }});
    }});
};

HttpMessageQueue.prototype.enqueueRawRequest = function({ path, headers, method, data }) { };

HttpMessageQueue.prototype.enqueueRequest = function({ httpRequest }) { };
HttpMessageQueue.prototype.enqueueResponse = function({ httpResponse }) { };
HttpMessageQueue.prototype.dequeueRequest = function () { };
HttpMessageQueue.prototype.dequeueResponse = function () { };

HttpMessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage }) { };
HttpMessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage }) { };
HttpMessageQueue.prototype.dequeueRequestMessage = function () { };
HttpMessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { HttpMessageQueue };