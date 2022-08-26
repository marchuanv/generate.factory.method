function HttpServerMessageBusMessageQueueBinding({ messageQueueBinding }) {
    const { HttpServerMessageBus } = require('../http/httpservermessagebus.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpServerMessageBus });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpServerMessageBusMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpServerMessageBusMessageQueueBinding };
