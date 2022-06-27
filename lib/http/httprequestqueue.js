const http = require('http');
function HttpRequestQueue() {
    const clientQueue = [];
    const serverQueue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpRequest, isClient }) => {
        if (!(httpRequest instanceof http.ClientRequest) && !(httpRequest instanceof http.IncomingMessage)) {
            throw new Error("the 'httpRequest' parameter is undefined, null or not of type: http.ClientRequest or http.IncomingMessage");
        }
        if (!queue.find(q => q.httpRequest.Id === httpRequest.Id )) {
            console.log('http request queued.');
            if (isClient) {
                clientQueue.push({ httpRequest });
            } else {
                serverQueue.push({ httpRequest });
            }
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: ({ isClient }) => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpRequest = isClient ? clientQueue.shift() : serverQueue.shift();
                if (httpRequest) {
                    clearInterval(id);
                    return resolve({ httpRequest });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: () => {
        return queue.length === 0;
    }});
}
HttpRequestQueue.prototype.enqueue = function({ httpRequest, isClient }) { };
HttpRequestQueue.prototype.dequeue = function({ isClient }) { };
HttpRequestQueue.prototype.isEmpty = function() { };
module.exports = { HttpRequestQueue };
