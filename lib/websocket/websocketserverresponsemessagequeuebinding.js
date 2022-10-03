const { WebSocketServerResponseMessageQueueBinding } = require("./websocketserverresponsemessagequeuebinding.prototype");
WebSocketServerResponseMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketServerResponseMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketServerResponseMessageQueueBinding };