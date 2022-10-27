const { HttpClientStartMessageQueueBinding } = require("./httpclientstartmessagequeuebinding.prototype");
HttpClientStartMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpClientStartMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpClientStartMessageQueueBinding };
