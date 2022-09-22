const { WebSocketServerResponseMessageQueueBinding } = require("./websocketserverresponsemessagequeuebinding.prototype");
WebSocketServerResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketServerResponseMessageQueueBinding };