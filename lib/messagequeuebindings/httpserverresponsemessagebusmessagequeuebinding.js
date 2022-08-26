function HttpServerResponseMessageBusMessageQueueBinding({ messageQueueBinding }) {
    const { HttpServerResponseMessageBus } = require('../http/httpserverresponsemessagebus.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpServerResponseMessageBus });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpServerResponseMessageBusMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpServerResponseMessageBusMessageQueueBinding };
