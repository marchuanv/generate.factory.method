function WebSocketClientRequestMessageBus({ websocketClientRequestMessageQueueBinding }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: ({ websocketRequestMessage }) => {
        websocketClientRequestMessageQueueBinding.queueMessage({ message: websocketRequestMessage });
    }});
};
WebSocketClientRequestMessageBus.prototype.publish = function({ websocketRequestMessage }) { };
module.exports = { WebSocketClientRequestMessageBus };
