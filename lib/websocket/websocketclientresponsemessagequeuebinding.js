const { WebSocketClientResponseMessageQueueBinding } = require("./websocketclientresponsemessagequeuebinding.prototype");
WebSocketClientResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketClientResponseMessageQueueBinding };
