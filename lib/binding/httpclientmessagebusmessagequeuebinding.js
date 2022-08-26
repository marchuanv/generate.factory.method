function HttpClientMessageBusMessageQueueBinding({ messageQueueBinding }) {
    const { HttpClientMessageBus } = require('../http/httpclientmessagebus.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpClientMessageBus });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpClientMessageBusMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpClientMessageBusMessageQueueBinding };