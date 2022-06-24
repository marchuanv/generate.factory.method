const http = require('http');
const utils = require("utils");

function HttpRequestQueue() {
    const queue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: ({ httpRequest, httpResponse }) => {
        if (!(httpRequest instanceof http.ClientRequest) && !(httpRequest instanceof http.IncomingMessage)) {
            throw new Error("the 'httpRequest' parameter is undefined, null or not of type: http.ClientRequest or http.IncomingMessage");
        }
        if (!(httpResponse instanceof http.ServerResponse)) {
            throw new Error("the 'httpResponse' parameter is undefined, null or not of type: http.ServerResponse");
        }
        if (!queue.find(q => q.httpRequest.Id === httpRequest.Id )) {
            console.log('http request queued.');
            queue.push({ httpRequest, httpResponse });
        }
                    //httpResponse.writeHead(httpResponseMessage.getStatusCode(), httpResponseMessage.getStatusMessage(), httpResponseMessage.getHeaders()).end(httpResponseMessage.getContent());

    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: () => {
        return queue.shift();
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: () => {
        return queue.length === 0;
    }});
    Object.defineProperty(this, 'getClonedQueue', { writable: false, value: () => {
        return utils.getJSONObject(utils.getJSONString(queue));
    }});
}
HttpRequestQueue.prototype.enqueue = async function({ httpRequest, httpResponse }) { };
HttpRequestQueue.prototype.dequeue = async function() { };
HttpRequestQueue.prototype.isEmpty = async function() { };
HttpRequestQueue.prototype.getClonedQueue = function() { };
module.exports = { HttpRequestQueue };
