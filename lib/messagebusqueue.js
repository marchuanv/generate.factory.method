function MessageBusQueue({ sharedMessageQueue }) {
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
MessageBusQueue.prototype.enqueueRequestMessage = function({ requestMessage }) { };
MessageBusQueue.prototype.enqueueRespponseMessage = function({ responseMessage }) { };
MessageBusQueue.prototype.dequeueRequestMessage = function () { };
MessageBusQueue.prototype.dequeueResponseMessage = function () { };
module.exports = { MessageBusQueue };