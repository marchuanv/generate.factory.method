function MessageQueueBinder({ messageQueue }) {
    const bindinQueueName = 'binding';
    const unbindingQueueName = 'unbinding';
    Object.defineProperty(this, 'bind', { configurable: false, writable: false, value: ({ queueName }) => {
        messageQueue.queueMessage({ message: { queueName }, queueName: bindinQueueName });
    }});
    Object.defineProperty(this, 'unbind', { configurable: false, writable: false, value: ({ queueName }) => {
        messageQueue.queueMessage({ message: { queueName }, queueName: unbindingQueueName });
    }});
};
MessageQueueBinder.prototype.bind = function ({ queueName }) { };
MessageQueueBinder.prototype.unbind = function ({ queueName }) { };
module.exports = { MessageQueueBinder };
