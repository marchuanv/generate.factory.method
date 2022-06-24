const { HttpResponseMessage } = require("./httpresponsemessage");
const { HttpRequestMessage } = require("./httprequestmessage");
const errorMessages = require("../errormessages");

function HttpMessageQueue() {
    const queue = [];
    Object.defineProperty(this, 'enqueue', { writable: false, value: async ({ httpMessage }) => {
        if (!(httpMessage instanceof HttpRequestMessage) && !(httpMessage instanceof HttpResponseMessage)) {
            throw new Error("the 'httpMessage' parameter is undefined, null or not of type: HttpRequestMessage or HttpResponseMessage");
        }
        if (!queue.find(msg => msg.getId() === httpMessage.getId())){
            queue.push(httpMessage);
        }
    }});
    Object.defineProperty(this, 'dequeue', { writable: false, value: async () => {
        return queue.shift();
    }});
    Object.defineProperty(this, 'isEmpty', { writable: false, value: async () => {
        return queue.length === 0;
    }});
}
HttpMessageQueue.prototype.enqueue = async function({ httpMessage }) { };
HttpMessageQueue.prototype.dequeue = async function() { };
HttpMessageQueue.prototype.isEmpty = async function() { };
module.exports = { HttpMessageQueue };