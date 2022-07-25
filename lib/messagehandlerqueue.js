function MessageHandlerQueue({ sharedMessageQueue }) {
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({ requestMessage }) => {
        const { queueId } = sharedMessageQueue.queueMessage({ message: requestMessage, messageQueueType: 'RequestMessage' });
        return { queueId };
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ responseMessage }) => {
        const { queueId } = sharedMessageQueue.queueMessage({ message: responseMessage, messageQueueType: 'ResponseMessage' });
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

MessageHandlerQueue.prototype.enqueueRequestMessage = function({ requestMessage }) { };
MessageHandlerQueue.prototype.enqueueRespponseMessage = function({ responseMessage }) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = function () { };

module.exports = { MessageHandlerQueue };