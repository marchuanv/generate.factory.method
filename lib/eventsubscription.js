function EventSubscription({ event, subscription, sharedMessageQueue, sharedEventSubscriptions }) {
    if (!sharedMessageQueue.isBinded({ messageQueueType: event.name })) {
        sharedMessageQueue.bind({ messageQueueType: event.name });
    }
    sharedEventSubscriptions.register({ event, subscription });
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        const { message } = await sharedMessageQueue.dequeueMessage({ messageQueueType: event.name });
        try {
            callback();
        } catch(err) {
            console.log(err);
        }
        sharedEventSubscriptions.setCallbackCount({ event, subscription, callbackCount: 1 });
        const totalSubscriberCount = sharedEventSubscriptions.getTotalSubscriptionCount({ event });
        const totalCallbackCount = sharedEventSubscriptions.getTotalCallbackCount({ event });
        if (totalCallbackCount < totalSubscriberCount && totalSubscriberCount > 1) {
            await sharedMessageQueue.queueMessage({ message, messageQueueType: event.name });
        } 
        console.log('RAISING EVENT: ', event);
        await this.subscribe({ callback });
    }});
};
EventSubscription.prototype.subscribe = async function({ callback }) { };
module.exports = { EventSubscription };