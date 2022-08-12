function EventPublisher({ event, sharedMessageQueue, sharedSubscriptions, sharedEventLogger, contextId }) {
    const QueueName = `${contextId}_${event.name}`;
    if (!sharedMessageQueue.isBinded({ QueueName })) {
        sharedMessageQueue.bind({ QueueName });
    }
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async () => {
        const date = new Date();
        const subscriptionCount = sharedSubscriptions.getSubscriptionCount({ eventName: event.name });
        for(let i = 0; i < subscriptionCount; i++) {
            sharedMessageQueue.queueMessage({ message: event, QueueName });
        }
        await sharedEventLogger.log({ date, event });
    }});
};
EventPublisher.prototype.publish = async function() { };
module.exports = { EventPublisher };