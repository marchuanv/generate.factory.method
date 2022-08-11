function EventSubscription({ event, subscription, sharedMessageQueue, sharedEventSubscriptions }) {
    if (!sharedMessageQueue.isBinded({ messageQueueType: event.name })) {
        sharedMessageQueue.bind({ messageQueueType: event.name });
    }
    sharedEventSubscriptions.register({ event, subscription });
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        const { message } = await sharedMessageQueue.dequeueMessage({ messageQueueType: event.name });
        const subscriberCount = sharedEventSubscriptions.getSubscriptionCount({ event });
        if (sharedEventSubscriptions.getTotalCallbackCount({ event }) < subscriberCount) {
            if (subscriberCount > 1) {
                await sharedMessageQueue.queueMessage({ message, messageQueueType: event.name });
            }
            await callback();
            sharedSubscribers.setCallbackCount({ event, callbackCount: 1 });
        } else {
            sharedSubscribers.setCallbackCount({ event, callbackCount: 0 });
        }
        await this.subscribe({ callback });
    }});
};
EventSubscription.prototype.subscribe = async function({ callback }) { };
module.exports = { EventSubscription };