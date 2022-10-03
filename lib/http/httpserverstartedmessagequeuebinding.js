const { HttpServerStartedMessageQueueBinding } = require("./httpserverstartedmessagequeuebinding.prototype");
HttpServerStartedMessageQueueBinding.prototype.constructor = function({factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStartedMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStartedMessageQueueBinding };
