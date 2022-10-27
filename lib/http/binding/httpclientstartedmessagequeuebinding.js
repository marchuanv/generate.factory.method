const { HttpClientStartedMessageQueueBinding } = require("./httpclientstartedmessagequeuebinding.prototype");
HttpClientStartedMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStartedMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpClientStartedMessageQueueBinding };