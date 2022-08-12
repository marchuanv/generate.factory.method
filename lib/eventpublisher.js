function EventPublisher({ event, sharedMessageQueue, sharedSubscriptions, sharedEventLogger, contextId }) {
    const messageQueueType = `${contextId}_${event.name}`;
    if (!sharedMessageQueue.isBinded({ messageQueueType })) {
        sharedMessageQueue.bind({ messageQueueType });
    }
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async () => {
        const date = new Date();
        const subscriptionCount = sharedSubscriptions.getSubscriptionCount({ eventName: event.name });
        for(let i = 0; i < subscriptionCount; i++) {
            sharedMessageQueue.queueMessage({ message: event, messageQueueType });
        }
        await sharedEventLogger.log({ date, event });
    }});
};
EventPublisher.prototype.publish = async function() { };
module.exports = { EventPublisher };