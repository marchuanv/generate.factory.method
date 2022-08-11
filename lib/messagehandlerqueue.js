function MessageHandlerQueue({ sharedMessageQueue, messageQueueType, messageQueueContextId }) {
    const responseMessageQueueType = `${messageQueueType.name}Response`;
    const requestMessageQueueType = `${messageQueueType.name}Request`;
    sharedMessageQueue.bind({  messageQueueType: requestMessageQueueType, messageQueueContextId});
    sharedMessageQueue.bind({  messageQueueType: responseMessageQueueType, messageQueueContextId });
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: async ({ message }) => {
        return await sharedMessageQueue.queueMessage({ message, messageQueueType: requestMessageQueueType, messageQueueContextId });
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: async ({ message }) => {
        return await sharedMessageQueue.queueMessage({ message, messageQueueType: responseMessageQueueType, messageQueueContextId });
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType, messageQueueContextId });
        return { message, queueId };
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType, messageQueueContextId });
        return { message, queueId };
    }});
};

MessageHandlerQueue.prototype.enqueueRequestMessage = async function({ message }) { };
MessageHandlerQueue.prototype.enqueueResponseMessage = async function({ message }) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = async function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = async function () { };
module.exports = { MessageHandlerQueue };