function WebSocketClientResponseMessageBus({ websocketClientResponseMessageQueueBinding }) {
    this.constructor({ websocketClientResponseMessageQueueBinding });
};
WebSocketClientResponseMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { WebSocketClientResponseMessageBus };
