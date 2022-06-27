const http = require('http');
function HttpResponseQueue() {
    const clientQueue = [];
    const serverQueue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpResponse, isClient }) => {
        if (!(httpResponse instanceof http.ServerResponse) && !(httpResponse instanceof http.IncomingMessage)) {
            throw new Error("the 'httpResponse' parameter is undefined, null or not of type: http.ServerResponse or http.IncomingMessage");
        }
        if (!queue.find(q => q.httpResponse.Id === httpResponse.Id )) {
            console.log('http response queued.');
            if (isClient) {
                clientQueue.push({ httpResponse });
            } else {
                serverQueue.push({ httpResponse });
            }
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: ({ isClient }) => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpResponse = isClient ? clientQueue.shift() : serverQueue.shift();
                if (httpResponse) {
                    clearInterval(id);
                    return resolve({ httpResponse });
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: () => {
        return queue.length === 0;
    }});
}
HttpResponseQueue.prototype.enqueue = function({ httpResponse, isClient }) { };
HttpResponseQueue.prototype.dequeue = function({ isClient }) { };
HttpResponseQueue.prototype.isEmpty = function() { };
module.exports = { HttpResponseQueue };
