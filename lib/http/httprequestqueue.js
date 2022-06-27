const http = require('http');
function HttpRequestQueue() {
    const queue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpRequest }) => {
        if (!(httpRequest instanceof http.ClientRequest) && !(httpRequest instanceof http.IncomingMessage)) {
            throw new Error("the 'httpRequest' parameter is undefined, null or not of type: http.ClientRequest or http.IncomingMessage");
        }  
        if (!queue.find(q => q.httpRequest.Id === httpRequest.Id )) {
            console.log('http request queued.');
            queue.push({ httpRequest });
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: () => {
        return new Promise((resolve) => {
            const id = setInterval(() => {
                const item = queue.shift();
                if (item) {
                    clearInterval(id);
                    return resolve(item);
                }
            }, 1000);
        });
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: () => {
        return queue.length === 0;
    }});
}
HttpRequestQueue.prototype.enqueue = function({ httpRequest }) { };
HttpRequestQueue.prototype.dequeue = function() { };
HttpRequestQueue.prototype.isEmpty = function() { };
module.exports = { HttpRequestQueue };
