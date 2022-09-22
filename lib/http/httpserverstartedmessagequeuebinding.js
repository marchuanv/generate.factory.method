const { HttpServerStartedMessageQueueBinding } = require("./httpserverstartedmessagequeuebinding.prototype");
HttpServerStartedMessageQueueBinding.prototype.constructor = function({factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStartedMessageQueueBinding };
