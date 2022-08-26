function HttpClientMessageBusManagerMessageQueueBinding({ messageQueueBinding }) {
    const { HttpClientMessageBusManager } = require('../http/httpclientmessagebusmanager.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpClientMessageBusManager });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpClientMessageBusManagerMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpClientMessageBusManagerMessageQueueBinding };
