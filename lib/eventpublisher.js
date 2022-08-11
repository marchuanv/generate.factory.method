function EventPublisher({ event, sharedMessageQueue }) {
    if (!sharedMessageQueue.isBinded({ messageQueueType: event.name })) {
        sharedMessageQueue.bind({ messageQueueType: event.name });
    }
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async () => {
        const date = new Date();
        await sharedMessageQueue.queueMessage({ message: event, messageQueueType: event.name });
        const currentDate = date.toLocaleTimeString()  + `.${date.getMilliseconds()}`;
        const { name, source } = event;
        console.log('');
        console.log('EventPublisher: ');
        console.log(`   -> ${currentDate}: ${name} was published from ${source}`);
        console.log('');
    }});
};
EventPublisher.prototype.publish = async function() { };
module.exports = { EventPublisher };