function MessageHandlerQueue({ sharedMessageQueue, messageQueueType }) {

    const responseMessageQueueType = `${messageQueueType.name}Response`;
    const requestMessageQueueType = `${messageQueueType.name}Request`;

    Object.defineProperty(this, 'open', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.bind({  messageQueueType: requestMessageQueueType });
        await sharedMessageQueue.bind({  messageQueueType: responseMessageQueueType });
    }});
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
    Object.defineProperty(this, 'close', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.unbind({ messageQueueType: responseMessageQueueType });
        await sharedMessageQueue.unbind({ messageQueueType: requestMessageQueueType });
    }});
};

MessageHandlerQueue.prototype.enqueueRequestMessage = async function({ requestMessage }) { };
MessageHandlerQueue.prototype.enqueueResponseMessage = async function({ responseMessage }) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = async function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = async function () { };
MessageHandlerQueue.prototype.close = async function () { };
MessageHandlerQueue.prototype.open = async function () { };
module.exports = { MessageHandlerQueue };