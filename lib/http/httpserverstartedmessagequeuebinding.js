const { HttpServerStartedMessageQueueBinding } = require("./httpserverstartedmessagequeuebinding.prototype");
HttpServerStartedMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}