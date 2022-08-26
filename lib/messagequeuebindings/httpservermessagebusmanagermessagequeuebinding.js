function HttpServerMessageBusManagerMessageQueueBinding({ messageQueueBinding }) {
    const { HttpServerMessageBusManager } = require('../http/httpservermessagebusmanager.js');
    const { messageQueue } = messageQueueBinding.getMessageQueue({ type: HttpServerMessageBusManager });
    Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
}
HttpServerMessageBusManagerMessageQueueBinding.prototype.messageQueue = null;
module.exports = { HttpServerMessageBusManagerMessageQueueBinding };
