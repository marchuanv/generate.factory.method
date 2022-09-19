const { HttpServerStartMessageQueueBinding } = require("./httpserverstartmessagequeuebinding.prototype");
HttpServerStartMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
