const { WebSocketClientRequestMessageBus } = require("./websocketclientrequestmessagebus.prototype");
WebSocketClientRequestMessageBus.prototype.constructor = function() {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: ({ websocketRequestMessage }) => {
        websocketClientRequestMessageQueueBinding.queueMessage({ message: websocketRequestMessage });
    }});
};
