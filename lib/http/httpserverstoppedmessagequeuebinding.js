const { HttpServerStoppedMessageQueueBinding } = require("./httpserverstoppedmessagequeuebinding.prototype");
HttpServerStoppedMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { HttpServerStoppedMessageQueueBinding };
