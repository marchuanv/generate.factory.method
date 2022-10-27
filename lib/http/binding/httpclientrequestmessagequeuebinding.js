const { HttpClientRequestMessageQueueBinding } = require("./httpclientrequestmessagequeuebinding.prototype");
HttpClientRequestMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientRequestMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpClientRequestMessageQueueBinding };