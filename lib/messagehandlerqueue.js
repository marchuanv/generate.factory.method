function MessageHandlerQueue({ sharedMessageQueue, messageQueueType }) {
    const responseMessageQueueType = `${messageQueueType.name}Response`;
    const requestMessageQueueType = `${messageQueueType.name}Request`;
    sharedMessageQueue.bind({  messageQueueType: requestMessageQueueType });
    sharedMessageQueue.bind({  messageQueueType: responseMessageQueueType });
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: async ({ message }) => {
        return await sharedMessageQueue.queueMessage({ message, messageQueueType: requestMessageQueueType });
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: async ({ message }) => {
        return await sharedMessageQueue.queueMessage({ message, messageQueueType: responseMessageQueueType });
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType });
        return { message, queueId };
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType });
        return { message, queueId };
    }});
};

MessageHandlerQueue.prototype.enqueueRequestMessage = async function({ message }) { };
MessageHandlerQueue.prototype.enqueueResponseMessage = async function({ message }) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = async function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = async function () { };
module.exports = { MessageHandlerQueue };