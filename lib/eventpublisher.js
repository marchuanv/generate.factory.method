function EventPublisher({ event, sharedMessageQueue, sharedSubscriptions, messageQueueContextId }) {
    const messageQueueType = `${messageQueueContextId}_${event.name}`;
    if (!sharedMessageQueue.isBinded({ messageQueueType })) {
        sharedMessageQueue.bind({ messageQueueType });
    }
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async () => {
        const date = new Date();
        const subscriptionCount = sharedSubscriptions.getSubscriptionCount({ eventName: event.name });
        for(let i = 0; i < subscriptionCount; i++) {
            sharedMessageQueue.queueMessage({ message: event, messageQueueType });
        }
        const currentDate = date.toLocaleTimeString()  + `.${date.getMilliseconds()}`;
        let { name, source, description } = event;
        console.log(`EventPublisher (${currentDate}): ${source} -> ${name} (${description})`);
    }});
};
EventPublisher.prototype.publish = async function() { };
module.exports = { EventPublisher };