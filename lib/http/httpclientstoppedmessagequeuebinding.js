const { HttpClientStoppedMessageQueueBinding } = require("./httpclientstoppedmessagequeuebinding.prototype");
HttpClientStoppedMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
