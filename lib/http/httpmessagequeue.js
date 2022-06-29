const { HttpMessageFactory } = require('../http/httpmessagefactory');
function HttpMessageQueue({ httpMessageFactory }) {
    
    if (!(httpMessageFactory instanceof HttpMessageFactory)) {
        throw new Error("the 'httpMessageFactory' parameter is null, undefined or not of type: HttpMessageFactory");
    }

    const httpRequestMessages = [];
    const httpResponseMessages = [];
    const httpRequests = [];
    const httpResponses = [];
    
    Object.defineProperty(this, 'enqueueRawRequest', { writable: false, value: ({ recipientAddress, path, headers, method, data }) => {
        console.log('http raw request message queued.');
        const httpRequestMessage = httpMessageFactory.createHttpRequestMessage({ recipientAddress, path, headers, method, data });
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
    
    Object.defineProperty(this, 'dequeueRequest', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpRequest = (httpRequests.shift() || { });
                if (httpRequest) {
                    clearInterval(id);
                    return resolve({ httpRequest });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'dequeueResponse', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpResponse = (httpResponses.shift() || { });
                if (httpResponse) {
                    clearInterval(id);
                    return resolve({ httpResponse });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpRequestMessage = (httpRequestMessages.shift() || { });
                if (httpRequestMessage) {
                    clearInterval(id);
                    return resolve({ httpRequestMessage });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpResponseMessage = (httpResponseMessages.shift() || { });
                if (httpResponseMessage) {
                    clearInterval(id);
                    return resolve({ httpResponseMessage });
                }
            }, 1000);
        });
    }});
};

HttpMessageQueue.prototype.enqueueRawRequest = function({ recipientAddress, path, headers, method, data }) { };

HttpMessageQueue.prototype.enqueueRequest = function({ httpRequest }) { };
HttpMessageQueue.prototype.enqueueResponse = function({ httpResponse }) { };
HttpMessageQueue.prototype.dequeueRequest = function () { };
HttpMessageQueue.prototype.dequeueResponse = function () { };

HttpMessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage }) { };
HttpMessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage }) { };
HttpMessageQueue.prototype.dequeueRequestMessage = function () { };
HttpMessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { HttpMessageQueue };