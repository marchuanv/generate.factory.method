const { HttpServerResponseMessageBus } = require("./httpserverresponsemessagebus.prototype");
HttpServerResponseMessageBus.prototype.constructor = function({ httpServerResponseMessageQueueBinding }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ httpResponseMessage }) => {
        await httpServerResponseMessageQueueBinding.queueMessage({ message: httpResponseMessage });
    }});
};
module.exports = { HttpServerResponseMessageBus };
