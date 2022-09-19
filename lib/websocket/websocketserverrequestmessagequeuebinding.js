const { WebSocketServerRequestMessageQueueBinding } = require("./websocketserverrequestmessagequeuebinding.prototype");
WebSocketServerRequestMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}