const { WebSocketServerResponseMessageQueueBinding } = require("./websocketserverresponsemessagequeuebinding.prototype");
WebSocketServerResponseMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketServerResponseMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { WebSocketServerResponseMessageQueueBinding };