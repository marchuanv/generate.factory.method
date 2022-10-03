const { WebSocketClientResponseMessageQueueBinding } = require("./websocketclientresponsemessagequeuebinding.prototype");
WebSocketClientResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketClientResponseMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketClientResponseMessageQueueBinding };
