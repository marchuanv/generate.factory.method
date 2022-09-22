function WebSocketServerRequestMessageBus({ webSocketServerRequestMessageQueueBinding }) {
    this.constructor({ webSocketServerRequestMessageQueueBinding });
};
WebSocketServerRequestMessageBus.prototype.subscribe = function ({ callback }) {  };
module.exports = { WebSocketServerRequestMessageBus };
