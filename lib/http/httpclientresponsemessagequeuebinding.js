const { HttpClientResponseMessageQueueBinding } = require("./httpclientresponsemessagequeuebinding.prototype");
HttpClientResponseMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}