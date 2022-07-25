function MessageHandlerQueue({ sharedMessageQueue, messageQueueType }) {

    const responseMessageQueueType = `${messageQueueType.name}Response`;
    const requestMessageQueueType = `${messageQueueType.name}Request`;

    sharedMessageQueue.register({  messageQueueType: requestMessageQueueType });
    sharedMessageQueue.register({  messageQueueType: responseMessageQueueType });

    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: async ({ requestMessage }) => {
        const { queueId } = await sharedMessageQueue.queueMessage({ message: requestMessage, messageQueueType: requestMessageQueueType });
        return { queueId };
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: async ({ responseMessage }) => {
        const { queueId } = await sharedMessageQueue.queueMessage({ message: responseMessage, messageQueueType: responseMessageQueueType });
        return { queueId };
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType });
        return { requestMessage: message, queueId };
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: responseMessageQueueType });
        return { responseMessage: message, queueId };
    }});
};

MessageHandlerQueue.prototype.enqueueRequestMessage = async function({ requestMessage }) { };
MessageHandlerQueue.prototype.enqueueRespponseMessage = async function({ responseMessage }) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = async function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = async function () { };

module.exports = { MessageHandlerQueue };