const http = require('http');
function HttpResponseQueue() {
    const queue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpResponse }) => {
        if (!(httpResponse instanceof http.ServerResponse) && !(httpResponse instanceof http.IncomingMessage)) {
            throw new Error("the 'httpResponse' parameter is undefined, null or not of type: http.ServerResponse or http.IncomingMessage");
        }
        if (!queue.find(q => q.httpRequest.Id === httpRequest.Id )) {
            console.log('http response queued.');
            queue.push({ httpResponse });
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const httpResponse = queue.shift();
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
HttpResponseQueue.prototype.enqueue = function({ httpResponse }) { };
HttpResponseQueue.prototype.dequeue = function() { };
HttpResponseQueue.prototype.isEmpty = function() { };
module.exports = { HttpResponseQueue };
