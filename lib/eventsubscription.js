function EventSubscription({ subscription, sharedMessageQueue, sharedSubscriptions, sharedEventLogger, contextId }) {
    const queueName = `${contextId}_${subscription.event.name}`;
    if (!sharedMessageQueue.isBinded({ queueName })) {
        sharedMessageQueue.bind({ queueName });
    }
    sharedSubscriptions.register({ subscription });
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        const { message } = await sharedMessageQueue.dequeueMessage({ queueName });
        const date = new Date();
        callback();
        // sharedEventLogger.log({ date, event: message });
        await this.subscribe({ callback });
    }});
};
EventSubscription.prototype.subscribe = async function({ callback }) { };
module.exports = { EventSubscription };