function HttpMessageQueue() {
    const httpMessages = [];
    Object.defineProperty(this, 'enqueueRequest', { writable: false, value: ({ httpRequestMessage }) => {
        if (httpRequestMessage && !httpMessages.find(msg => msg.getId() === httpRequestMessage.getId() )) {
            console.log('http request message queued.');
            httpMessages.push(httpRequestMessage);
        }
    }});
    Object.defineProperty(this, 'enqueueResponse', { writable: false, value: ({ httpResponseMessage }) => {
        if (httpResponseMessage && !httpMessages.find(msg => msg.getId() === httpResponseMessage.getId() )) {
            console.log('http response message queued.');
            httpMessages.push(httpResponseMessage);
        }
    }});
    Object.defineProperty(this, 'dequeueRequest', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpRequestMessage = (httpMessages.shift() || { });
                if (httpRequestMessage) {
                    clearInterval(id);
                    return resolve({ httpRequestMessage });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'dequeueResponse', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpResponseMessage = (httpMessages.shift() || { });
                if (httpResponseMessage) {
                    clearInterval(id);
                    return resolve({ httpResponseMessage });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: () => {
        return httpMessages.length === 0;
    }});
};
HttpMessageQueue.prototype.enqueueRequest = function({ httpRequestMessage }) { };
HttpMessageQueue.prototype.enqueueResponse = function({ httpResponseMessage }) { };
HttpMessageQueue.prototype.dequeueRequest = function () { };
HttpMessageQueue.prototype.dequeueResponse = function () { };
HttpMessageQueue.prototype.isEmpty = function() { };
module.exports = { HttpMessageQueue };