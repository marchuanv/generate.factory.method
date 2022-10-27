const { HttpServerStartMessageQueueBinding } = require("./httpserverstartmessagequeuebinding.prototype");
HttpServerStartMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStartMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStartMessageQueueBinding };
