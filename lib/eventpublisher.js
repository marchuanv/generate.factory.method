function EventPublisher({ event, sharedMessageQueue, sharedSubscriptions, sharedEventLogger, contextId }) {
    const queueName = `${contextId}_${event.name}`;
    if (!sharedMessageQueue.isBinded({ queueName })) {
        sharedMessageQueue.bind({ queueName });
    }
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async () => {
        const date = new Date();
        const subscriptionCount = sharedSubscriptions.getSubscriptionCount({ eventName: event.name });
        for(let i = 0; i < subscriptionCount; i++) {
            sharedMessageQueue.queueMessage({ message: event, queueName });
        }
        await sharedEventLogger.log({ date, event });
    }});
};
EventPublisher.prototype.publish = async function() { };
module.exports = { EventPublisher };