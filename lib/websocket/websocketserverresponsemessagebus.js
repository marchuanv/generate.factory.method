const { WebSocketServerResponseMessageBus } = require("./websocketserverresponsemessagebus.prototype");
WebSocketServerResponseMessageBus.prototype.constructor = function({ webSocketServerResponseMessageQueueBinding }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ webSocketResponseMessage }) => {
        await webSocketServerResponseMessageQueueBinding.queueMessage({ message: webSocketResponseMessage });
    }});
};
module.exports = { WebSocketServerResponseMessageBus };