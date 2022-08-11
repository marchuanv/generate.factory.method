function EventPublisher({ event, sharedMessageQueue }) {
    if (!sharedMessageQueue.isBinded({ messageQueueType: event.name })) {
        sharedMessageQueue.bind({ messageQueueType: event.name });
    }
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.queueMessage({ message: event, messageQueueType: event.name });
    }});
};
EventPublisher.prototype.publish = async function() { };
module.exports = { EventPublisher };