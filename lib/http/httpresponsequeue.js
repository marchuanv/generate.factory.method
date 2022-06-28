const http = require('http');
function HttpResponseQueue() {
    const clientQueue = [];
    const serverQueue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpResponse, isClient, error }) => {
        if (!(httpResponse instanceof http.ServerResponse) && !(httpResponse instanceof http.IncomingMessage)) {
            throw new Error("the 'httpResponse' parameter is undefined, null or not of type: http.ServerResponse or http.IncomingMessage");
        }
        const queue = isClient ? clientQueue : serverQueue;
        if (queue.find(q => q.httpResponse.Id === httpResponse.Id )) {
            console.log('http server response or request queued.');
            queue.push({ httpResponse, error });
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: ({ isClient }) => {
        return new Promise((resolve, reject) => {
            const id = setInterval(() => {
                const queue = isClient ? clientQueue : serverQueue;
                const { httpResponse, error } = (queue.shift() || { });
                if (error) {
                    return reject(error);
                }
                if (httpResponse) {
                    clearInterval(id);
                    return resolve({ httpResponse });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: ({ isClient }) => {
        return isClient ? clientQueue.length === 0 : serverQueue.length === 0;
    }});
}
HttpResponseQueue.prototype.enqueue = function({ httpResponse, isClient, error }) { };
HttpResponseQueue.prototype.dequeue = function({ isClient }) { };
HttpResponseQueue.prototype.isEmpty = function({ isClient }) { };
module.exports = { HttpResponseQueue };
