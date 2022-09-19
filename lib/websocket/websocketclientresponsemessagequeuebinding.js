const { WebSocketClientResponseMessageQueueBinding } = require("./websocketclientresponsemessagequeuebinding.prototype");
WebSocketClientResponseMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
