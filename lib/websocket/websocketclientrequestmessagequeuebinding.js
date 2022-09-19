const { WebSocketClientRequestMessageQueueBinding } = require("./websocketclientrequestmessagequeuebinding.prototype");
WebSocketClientRequestMessageQueueBinding.prototype.constructor = function() {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
