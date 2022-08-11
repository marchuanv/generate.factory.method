function MessageHandlerQueue({ sharedMessageQueue, messageQueueContextId }) {
    const { createEventSubscription } = require('../lib/factory/eventsubscription.factory.js');
    const responseMessageQueueType = `${messageQueueContextId}_MessageHandlerResponses`;
    const requestMessageQueueType = `${messageQueueContextId}_MessageHandlerRequests`;
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 3, eventSource: 'MessageHandlerQueue', eventDescription: 'Http Message Bus Started' });
        eventSubscription.subscribe({ callback: () => {
            sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType });
            sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType });
        }});
    }
    {
        const { eventSubscription } = createEventSubscription({ eventCode: 9, eventSource: 'MessageHandlerQueue', eventDescription: 'Http Message Bus Stopped' });
        eventSubscription.subscribe({ callback: () => {
            sharedMessageQueue.unbind({ messageQueueType: responseMessageQueueType });
            sharedMessageQueue.unbind({ messageQueueType: requestMessageQueueType });
        }});
    }
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