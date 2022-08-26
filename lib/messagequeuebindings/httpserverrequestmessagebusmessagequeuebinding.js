function HttpServerRequestMessageBusMessageQueueBinding({ messageQueueBinding }) {
    const { HttpServerRequestMessageBus } = require('../http/httpserverrequestmessagebus.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpServerRequestMessageBus });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpServerRequestMessageBusMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpServerRequestMessageBusMessageQueueBinding };
