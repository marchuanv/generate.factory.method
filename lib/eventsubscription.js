function EventSubscription({ event, sharedMessageQueue }) {
    const messageQueueType = `${event.name}Event`;
    if (!sharedMessageQueue.isBind({ messageQueueType })) {
        sharedMessageQueue.bind({ messageQueueType });
    }
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        const { message } = await sharedMessageQueue.dequeueMessage({ messageQueueType });
        const { source } = message;
        await callback();
        await this.subscribe({ callback });
    }});
};
EventSubscription.prototype.subscribe = async function({ callback }) { };
module.exports = { EventSubscription };