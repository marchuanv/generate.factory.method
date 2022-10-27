const { HttpServerStoppedMessageQueueBinding } = require("./httpserverstoppedmessagequeuebinding.prototype");
HttpServerStoppedMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'HttpServerStoppedMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStoppedMessageQueueBinding };
