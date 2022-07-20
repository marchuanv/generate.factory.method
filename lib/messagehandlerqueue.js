function MessageHandlerQueue({ sharedMessageQueue }) {
    Object.defineProperty(this, 'enqueueRequestMessage', { configurable: false, writable: false, value: ({ requestMessage }) => {
        sharedMessageQueue.queueMessage({ message: requestMessage, messageQueueType: 'RequestMessage' });
    }});
    Object.defineProperty(this, 'enqueueRespponseMessage', { configurable: false, writable: false, value: ({ responseMessage }) => {
        sharedMessageQueue.queueMessage({ message: responseMessage, messageQueueType: 'ResponseMessage' });
    }});
    Object.defineProperty(this, 'dequeueRequestMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'RequestMessage' });
        return { requestMessage: message };
    }});
    Object.defineProperty(this, 'dequeueResponseMessage', { configurable: false, writable: false, value: async () => {
        const { message }  = await sharedMessageQueue.dequeueMessage({ messageQueueType: 'ResponseMessage' });
        return { responseMessage: message };
    }});
};
MessageHandlerQueue.prototype.enqueueRequestMessage = function({ requestMessage }) { };
MessageHandlerQueue.prototype.enqueueRespponseMessage = function({ responseMessage }) { };
MessageHandlerQueue.prototype.dequeueRequestMessage = function () { };
MessageHandlerQueue.prototype.dequeueResponseMessage = function () { };
module.exports = { MessageHandlerQueue };