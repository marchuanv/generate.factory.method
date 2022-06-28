function HttpMessageQueue() {

    const httpRawRequests = [];
    const httpRawResponses = [];
    const httpRequestMessages = [];
    const httpResponseMessages = [];
    const httpRequests = [];
    const httpResponses = [];
    
    Object.defineProperty(this, 'enqueueRawRequest', { writable: false, value: ({ recipientAddress, path, headers, method, data }) => {
        console.log('http raw request message queued.');
        httpRawRequests.push({ recipientAddress, path, headers, method, data });
    }});
    Object.defineProperty(this, 'enqueueRawResponse', { writable: false, value: ({ recipientAddress, path, headers, method, data }) => {
        console.log('http raw response message queued.');
        httpRawResponses.push({ recipientAddress, path, headers, method, data });
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { writable: false, value: ({ httpRequestMessage }) => {
        if (httpRequestMessage && !httpRequestMessages.find(msg => msg.getId() === httpRequestMessage.getId() )) {
            console.log('http request message queued.');
            httpRequestMessages.push(httpRequestMessage);
        }
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { writable: false, value: ({ httpResponseMessage }) => {
        if (httpResponseMessage && !httpResponseMessages.find(msg => msg.getId() === httpResponseMessage.getId() )) {
            console.log('http response message queued.');
            httpResponseMessages.push(httpResponseMessage);
        }
    }});
    Object.defineProperty(this, 'enqueueRequest', { writable: false, value: ({ httpRequest }) => {
        if (httpRequest && !httpRequests.find(req => req.Id === httpRequest.Id)) {
            console.log('http request queued.');
            httpRequests.push(httpRequest);
        }
    }});
    Object.defineProperty(this, 'enqueueResponse', { writable: false, value: ({ httpResponse }) => {
        if (httpResponse && !httpResponses.find(res => res.Id === httpResponse.Id)) {
            console.log('http response queued.');
            httpResponses.push(httpResponse);
        }
    }});
    Object.defineProperty(this, 'dequeueRawRequest', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpRawRequest = (httpRawRequests.shift() || { });
                if (httpRawRequest) {
                    clearInterval(id);
                    return resolve({ httpRawRequest });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'dequeueRawResponse', { writable: false, value: ({ recipientAddress, path, headers, method, data }) => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpRawResponse = (httpRawResponses.shift() || { });
                if (httpRawResponse) {
                    clearInterval(id);
                    return resolve({ httpRawResponse });
                }
            }, 1000);
        });
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

HttpMessageQueue.prototype.enqueueRequest = function({ httpRequest }) { };
HttpMessageQueue.prototype.enqueueResponse = function({ httpResponse }) { };
HttpMessageQueue.prototype.dequeueRequest = function () { };
HttpMessageQueue.prototype.dequeueResponse = function () { };

HttpMessageQueue.prototype.enqueueRequestMessage = function({ httpRequestMessage }) { };
HttpMessageQueue.prototype.enqueueResponseMessage = function({ httpResponseMessage }) { };
HttpMessageQueue.prototype.dequeueRequestMessage = function () { };
HttpMessageQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { HttpMessageQueue };