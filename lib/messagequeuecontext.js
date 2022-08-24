function MessageQueueContext() {
    Object.defineProperty(this, 'queueMessage', { configurable: false, writable: false, value: async ({ message, queueName }) => {
    }});
};
MessageQueueContext.prototype.queueMessage = function() { };
module.exports = { MessageQueueContext };
