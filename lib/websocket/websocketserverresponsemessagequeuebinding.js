const { WebSocketServerResponseMessageQueueBinding } = require("./websocketserverresponsemessagequeuebinding.prototype");
WebSocketServerResponseMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
