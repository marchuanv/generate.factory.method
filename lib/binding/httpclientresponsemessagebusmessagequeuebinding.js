function HttpClientResponseMessageBusMessageQueueBinding({ messageQueueBinding }) {
    const { HttpClientResponseMessageBus } = require('../http/httpclientresponsemessagebus.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpClientResponseMessageBus });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpClientResponseMessageBusMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpClientResponseMessageBusMessageQueueBinding };