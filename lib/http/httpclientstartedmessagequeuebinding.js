const { HttpClientStartedMessageQueueBinding } = require("./httpclientstartedmessagequeuebinding.prototype");
HttpClientStartedMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, scopeId });
}