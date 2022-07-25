function MessageHandlerQueue({ sharedMessageQueue }) {
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: async ({ requestMessage }) => {
        const { queueId } = await sharedMessageQueue.queueMessage({ message: requestMessage, messageQueueType: 'RequestMessage' });
        return { queueId };
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: async ({ responseMessage }) => {
        const { queueId } = await sharedMessageQueue.queueMessage({ message: responseMessage, messageQueueType: 'ResponseMessage' });
        return { queueId };
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'RequestMessage' });
        return { requestMessage: message, queueId };
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, queueId } = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'ResponseMessage' });
        return { responseMessage: message, queueId };
    }});
};

MessageHandlerQueue.prototype.enqueueRequestMessage = async function({ requestMessage }) { };
MessageHandlerQueue.prototype.enqueueRespponseMessage = async function({ responseMessage }) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = async function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = async function () { };

module.exports = { MessageHandlerQueue };