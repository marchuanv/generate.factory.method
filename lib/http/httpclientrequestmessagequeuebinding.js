const { HttpClientRequestMessageQueueBinding } = require("./httpclientrequestmessagequeuebinding.prototype");
HttpClientRequestMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
