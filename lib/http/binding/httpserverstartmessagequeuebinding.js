const { HttpServerStartMessageQueueBinding } = require("./httpserverstartmessagequeuebinding.prototype");
HttpServerStartMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStartMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { HttpServerStartMessageQueueBinding };
