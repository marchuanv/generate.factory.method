const { HttpClientResponseMessageQueueBinding } = require("./httpclientresponsemessagequeuebinding.prototype");
HttpClientResponseMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientResponseMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpClientResponseMessageQueueBinding };