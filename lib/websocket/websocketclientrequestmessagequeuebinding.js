const { WebSocketClientRequestMessageQueueBinding } = require("./websocketclientrequestmessagequeuebinding.prototype");
WebSocketClientRequestMessageQueueBinding.prototype.constructor = function({ factoryContainerBindingName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketClientRequestMessageQueueBinding' });
    messageQueue.bind({ bindingObj: this, factoryContainerBindingName });
}
module.exports = { WebSocketClientRequestMessageQueueBinding };
