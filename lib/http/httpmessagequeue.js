function HttpMessageQueue() {
    const httpMessages = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpRequestMessage, httpResponseMessage }) => {
        if (httpRequestMessage && !httpMessages.find(msg => msg.getId() === httpRequestMessage.getId() )) {
            console.log('http request message queued.');
            httpMessages.push(httpRequestMessage);
        }
        if (httpResponseMessage && !httpMessages.find(msg => msg.getId() === httpResponseMessage.getId() )) {
            console.log('http response message queued.');
            httpMessages.push(httpResponseMessage);
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: () => {
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
    Object.defineProperty(this, 'isEmpty', { writable: false, value: () => {
        return httpMessages.length === 0;
    }});
};
HttpMessageQueue.prototype.getId = function() {};
HttpMessageQueue.prototype.getHeaders = function() {};
HttpMessageQueue.prototype.getStatusCode = () => {};
HttpMessageQueue.prototype.getStatusMessage = () => {};
HttpMessageQueue.prototype.getContent = () => {};
HttpMessageQueue.prototype.getContentType = () => {};
HttpMessageQueue.prototype.getContentLength = () => {};
HttpMessageQueue.prototype.getRecipientAddress = () => {};
HttpMessageQueue.prototype.validate = () => {};
module.exports = { HttpMessageQueue };