function MessageQueueBinding({ messageQueue }) {
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: (object) => {
        const type = object.prototype;
        const _messageQueue = messageQueue;
        {
            const { messageQueue } = _messageQueue.bind({ type });
            Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: messageQueue });
            Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: () => {
                messageQueue.unbind({ type });
                messageQueue = null;
            }});
        }
    }});
}
MessageQueueBinding.prototype.bind = function(object) { };
MessageQueueBinding.prototype.unbind = function() { };
module.exports = { MessageQueueBinding };