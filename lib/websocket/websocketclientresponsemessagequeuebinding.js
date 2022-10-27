const { WebSocketClientResponseMessageQueueBinding } = require("./websocketclientresponsemessagequeuebinding.prototype");
WebSocketClientResponseMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketClientResponseMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { WebSocketClientResponseMessageQueueBinding };
