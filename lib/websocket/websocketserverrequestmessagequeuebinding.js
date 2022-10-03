const { WebSocketServerRequestMessageQueueBinding } = require("./websocketserverrequestmessagequeuebinding.prototype");
WebSocketServerRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue  }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketServerRequestMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketServerRequestMessageQueueBinding };