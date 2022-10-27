const { WebSocketServerRequestMessageQueueBinding } = require("./websocketserverrequestmessagequeuebinding.prototype");
WebSocketServerRequestMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue  }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketServerRequestMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { WebSocketServerRequestMessageQueueBinding };