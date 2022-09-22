function WebSocketServerResponseMessageBus({ webSocketServerResponseMessageQueueBinding }) {
    this.constructor({ webSocketServerResponseMessageQueueBinding });
};
WebSocketServerResponseMessageBus.prototype.publish = async function({ httpResponseMessage }) { };
module.exports = { WebSocketServerResponseMessageBus };
