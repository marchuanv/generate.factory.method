const { HttpClientStoppedMessageQueueBinding } = require("./httpclientstoppedmessagequeuebinding.prototype");
HttpClientStoppedMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStoppedMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpClientStoppedMessageQueueBinding };
