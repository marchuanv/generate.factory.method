const { HttpClientStopMessageQueueBinding } = require("./httpclientstopmessagequeuebinding.prototype");
HttpClientStopMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, scopeId });
}
