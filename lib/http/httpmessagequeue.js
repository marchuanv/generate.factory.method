const utils = require('utils');
function HttpMessageQueue({ httpMessageFactory }) {
    
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }

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
    
    Object.defineProperty(this, 'enqueueRawRequest', { writable: false, value: ({ path, headers, method, data }) => {
        console.log('http raw request message queued.');
        const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ data, headers, method, path });
        httpRequestMessages.push(httpRequestMessage);
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { writable: false, value: ({ httpRequestMessage, httpRequest }) => {
        console.log('http request message queued.');
        if (httpRequest) {
            const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ 
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
    Object.defineProperty(this, 'enqueueResponseMessage', { writable: false, value: ({ httpResponseMessage, httpResponse }) => {
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
HttpMessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage, httpRequest }) { };
HttpMessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage, httpResponse }) { };
HttpMessageQueue.prototype.dequeueRequestMessage = function () { };
HttpMessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { HttpMessageQueue };