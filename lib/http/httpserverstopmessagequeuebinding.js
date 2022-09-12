const { HttpServerStopMessageQueueBinding } = require("./httpserverstopmessagequeuebinding.prototype");
HttpServerStopMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, scopeId });
}
