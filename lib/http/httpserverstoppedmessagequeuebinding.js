const { HttpServerStoppedMessageQueueBinding } = require("./httpserverstoppedmessagequeuebinding.prototype");
HttpServerStoppedMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
