const { HttpResponseMessage } = require("./httpresponsemessage");
const { HttpRequestMessage } = require("./httprequestmessage");
const http = require('http');
const errorMessages = require("../errormessages");

function HttpRequestQueue() {
    const queue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: async ({ httpRequest, httpResponse }) => {
        if (!(httpRequest instanceof http.ClientRequest) && !(httpRequest instanceof http.IncomingMessage)) {
            throw new Error("the 'httpRequest' parameter is undefined, null or not of type: http.ClientRequest or http.IncomingMessage");
        }
        if (!(httpResponse instanceof http.ServerResponse)) {
            throw new Error("the 'httpResponse' parameter is undefined, null or not of type: http.ServerResponse");
        }
        if (!queue.find(msg => msg.getId() === httpMessage.getId())){
            console.log('http request queued.');
            queue.push(httpRequest);
        }
                    //httpResponse.writeHead(httpResponseMessage.getStatusCode(), httpResponseMessage.getStatusMessage(), httpResponseMessage.getHeaders()).end(httpResponseMessage.getContent());

    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: async () => {
        return queue.shift();
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: async () => {
        return queue.length === 0;
    }});
}
HttpRequestQueue.prototype.enqueue = async function({ httpRequest, httpResponse }) { };
HttpRequestQueue.prototype.dequeue = async function() { };
HttpRequestQueue.prototype.isEmpty = async function() { };
module.exports = { HttpRequestQueue };