function MessageQueueBinding({ messageQueue }) {
    const bindings = { };
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: (object) => {
        const type = object.constructor;
        let { bindedMessageQueue } = messageQueue.bind({ queueName: type });
        Object.defineProperty(this, 'messageQueue', { configurable: false, writable: false, value: bindedMessageQueue });
        Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: () => {
            bindedMessageQueue.unbind({ type });
            bindedMessageQueue = null;
        }});
    }});
}
MessageQueueBinding.prototype.bind = function(object) { };
MessageQueueBinding.prototype.unbind = function() { };
module.exports = { MessageQueueBinding };