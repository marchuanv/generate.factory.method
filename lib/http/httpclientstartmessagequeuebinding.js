const { HttpClientStartMessageQueueBinding } = require("./httpclientstartmessagequeuebinding.prototype");
HttpClientStartMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
