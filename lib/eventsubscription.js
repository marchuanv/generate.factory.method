function EventSubscription({ subscription, sharedMessageQueue, sharedSubscriptions, messageQueueContextId }) {
    const messageQueueType = `${messageQueueContextId}_${subscription.event.name}`;
    if (!sharedMessageQueue.isBinded({ messageQueueType })) {
        sharedMessageQueue.bind({ messageQueueType });
    }
    sharedSubscriptions.register({ subscription });
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        const { message } = await sharedMessageQueue.dequeueMessage({ messageQueueType });
        const date = new Date();
        callback();
        const currentDate = date.toLocaleTimeString()  + `.${date.getMilliseconds()}`;
        const { name, source } = message;
        console.log(`EventSubscriber (${currentDate}): ${source} -> ${name} -> ${subscription.name}`);
        await this.subscribe({ callback });
    }});
};
EventSubscription.prototype.subscribe = async function({ callback }) { };
module.exports = { EventSubscription };