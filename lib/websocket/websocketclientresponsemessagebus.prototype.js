function WebSocketClientResponseMessageBus({ websocketClientResponseMessageQueueBinding, factoryContainerBindingName }) {
    this.constructor({ websocketClientResponseMessageQueueBinding, factoryContainerBindingName});
};
WebSocketClientResponseMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { WebSocketClientResponseMessageBus };
