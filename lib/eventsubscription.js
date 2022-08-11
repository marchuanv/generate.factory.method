function EventSubscription({ event, subscription, sharedMessageQueue, sharedEventSubscriptions }) {
    if (!sharedMessageQueue.isBinded({ messageQueueType: event.name })) {
        sharedMessageQueue.bind({ messageQueueType: event.name });
    }
    sharedEventSubscriptions.register({ event, subscription });
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        const { message } = await sharedMessageQueue.dequeueMessage({ messageQueueType: event.name });
        const totalSubscriberCount = sharedEventSubscriptions.getTotalSubscriptionCount({ event });
        const totalCallbackCount = sharedEventSubscriptions.getTotalCallbackCount({ event });
        if (totalCallbackCount < (totalSubscriberCount-1) && totalSubscriberCount > 1) {
            await callback();
            sharedEventSubscriptions.setCallbackCount({ event, subscription, callbackCount: 1 });
            await sharedMessageQueue.queueMessage({ message, messageQueueType: event.name });
        } else {
            await callback();
        }
        sharedEventSubscriptions.setCallbackCount({ event, subscription, callbackCount: 0 });
        await this.subscribe({ callback });
    }});
};
EventSubscription.prototype.subscribe = async function({ callback }) { };
module.exports = { EventSubscription };