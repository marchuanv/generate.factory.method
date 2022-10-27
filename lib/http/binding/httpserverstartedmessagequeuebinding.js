const { HttpServerStartedMessageQueueBinding } = require("./httpserverstartedmessagequeuebinding.prototype");
HttpServerStartedMessageQueueBinding.prototype.constructor = function({contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStartedMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpServerStartedMessageQueueBinding };
