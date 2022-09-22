const { HttpServerStartMessageQueueBinding } = require("./httpserverstartmessagequeuebinding.prototype");
HttpServerStartMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStartMessageQueueBinding };
