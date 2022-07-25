function MessageHandlerQueue({ sharedMessageQueue }) {
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({ requestMessage, refId }) => {
        sharedMessageQueue.queueMessage({ message: requestMessage, messageQueueType: 'RequestMessage', refId });
        return { refId };
    }});
    Object.defineProperty(this, 'enqueueResponseMessage', { configurable: false, writable: false, value: ({ responseMessage, refId }) => {
        sharedMessageQueue.queueMessage({ message: responseMessage, messageQueueType: 'ResponseMessage', refId });
        return { refId };
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message, refId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'RequestMessage' });
        return { requestMessage: message, refId };
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message, refId }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'ResponseMessage' });
        return { responseMessage: message, refId };
    }});
};
MessageHandlerQueue.prototype.enqueueRequestMessage = function({ requestMessage, refId }) { };
MessageHandlerQueue.prototype.enqueueRespponseMessage = function({ responseMessage, refId}) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = function () { };
module.exports = { MessageHandlerQueue };