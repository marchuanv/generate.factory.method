function MessageHandlerQueue({ sharedMessageQueue, messageQueueType }) {

    const responseMessageQueueType = `${messageQueueType.name}Response`;
    const requestMessageQueueType = `${messageQueueType.name}Request`;

    Object.defineProperty(this, 'open', { configurable: false, writable: false, value: async () => {
        await sharedMessageQueue.bind({  messageQueueType: requestMessageQueueType });
        await sharedMessageQueue.bind({  messageQueueType: responseMessageQueueType });
    }});
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: async ({ requestMessage }) => {
        return await sharedMessageQueue.queueMessage({ message: requestMessage, messageQueueType: requestMessageQueueType });
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: async ({ responseMessage }) => {
        return await sharedMessageQueue.queueMessage({ message: responseMessage, messageQueueType: responseMessageQueueType });
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType });
        return { requestMessage: message, queueId };
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType });
        return { responseMessage: message, queueId };
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