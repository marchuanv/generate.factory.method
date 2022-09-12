const { HttpServerRequestMessageQueueBinding } = require("./httpserverrequestmessagequeuebinding.prototype");
HttpServerRequestMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, scopeId });
}