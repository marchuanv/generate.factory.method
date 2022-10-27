const { WebSocketClientRequestMessageQueueBinding } = require("./websocketclientrequestmessagequeuebinding.prototype");
WebSocketClientRequestMessageQueueBinding.prototype.constructor = function({ contextName, messageQueue }) {
    Object.defineProperty(this, 'name', { configurable: true, writable: false, value: 'WebSocketClientRequestMessageQueueBinding' });
    messageQueue.bind({ contextObj: this, contextName });
}
module.exports = { WebSocketClientRequestMessageQueueBinding };
