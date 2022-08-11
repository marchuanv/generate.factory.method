function EventSubscription({ event, sharedMessageQueue }) {
    const messageQueueType = `${event.name}event`;
    sharedMessageQueue.bind({  messageQueueType });
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: async ({ callback }) => {
        const { message } = await sharedMessageQueue.dequeueMessage({ messageQueueType });
        const { event } = message;
        await callback({ event });
        await this.subscribe({ callback });
    }});
};
EventSubscription.prototype.subscribe = async function({ callback }) { };
module.exports = { EventSubscription };