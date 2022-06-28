const http = require('http');
function HttpRequestQueue() {
    const clientQueue = [];
    const serverQueue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpRequest, isClient, error }) => {
        if (!(httpRequest instanceof http.ClientRequest) && !(httpRequest instanceof http.IncomingMessage)) {
            throw new Error("the 'httpRequest' parameter is undefined, null or not of type: http.ClientRequest or http.IncomingMessage");
        }
        const queue = isClient ? clientQueue : serverQueue;
        if (!queue.find(q => q.httpRequest.Id === httpRequest.Id )) {
            console.log('http server response or request queued.');
            queue.push({ httpRequest, error });
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: ({ isClient }) => {
        return new Promise((resolve, reject) => {
            const queue = isClient ? clientQueue : serverQueue;
            const id = setInterval(() => {
                const { httpRequest, error } = (queue.shift() || { });
                if (error) {
                    return reject(error);
                }
                if (httpRequest) {
                    clearInterval(id);
                    return resolve({ httpRequest });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: ({ isClient }) => {
        return isClient ? clientQueue.length === 0 : serverQueue.length === 0;
    }});
}
HttpRequestQueue.prototype.enqueue = function({ httpRequest, isClient, error }) { };
HttpRequestQueue.prototype.dequeue = function({ isClient }) { };
HttpRequestQueue.prototype.isEmpty = function({ isClient }) { };
module.exports = { HttpRequestQueue };
