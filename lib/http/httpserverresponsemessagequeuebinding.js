const { HttpServerResponseMessageQueueBinding } = require("./httpserverresponsemessagequeuebinding.prototype");
HttpServerResponseMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, scopeId });
}
