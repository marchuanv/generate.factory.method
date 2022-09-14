const { WebSocketServerResponseMessageBus } = require("./websocketserverresponsemessagebus.prototype");
WebSocketServerResponseMessageBus.prototype.constructor = function() {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ webSocketResponseMessage }) => {
        await webSocketServerResponseMessageQueueBinding.queueMessage({ message: webSocketResponseMessage });
    }});
};
