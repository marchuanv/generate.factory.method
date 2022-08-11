function EventPublisher({ event, sharedMessageQueue }) {
    const messageQueueType = `${event.name}Event`;
    sharedMessageQueue.bind({  messageQueueType });
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.queueMessage({ message: event, messageQueueType });
    }});
};
EventPublisher.prototype.subscribe = async function() { };
module.exports = { EventPublisher };