function WebSocketClientResponseMessageBus({ websocketClientResponseMessageQueueBinding, contextName }) {
    this.constructor({ websocketClientResponseMessageQueueBinding, contextName});
};
WebSocketClientResponseMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { WebSocketClientResponseMessageBus };
