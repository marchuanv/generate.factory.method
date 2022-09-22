const { WebSocketClientRequestMessageQueueBinding } = require("./websocketclientrequestmessagequeuebinding.prototype");
WebSocketClientRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketClientRequestMessageQueueBinding };
