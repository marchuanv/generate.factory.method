function WebSocketClientRequestMessageBus({ websocketClientRequestMessageQueueBinding }) {
    this.constructor({ websocketClientRequestMessageQueueBinding });
};
WebSocketClientRequestMessageBus.prototype.publish = function({ websocketRequestMessage }) { };
module.exports = { WebSocketClientRequestMessageBus };
