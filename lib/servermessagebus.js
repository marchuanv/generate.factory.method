function ServerMessageBus({ sharedMessageQueue, httpServerMessageBus, contextId }) {
    const responseMessageQueueType = `${contextId}_ServerResponses`;
    const requestMessageQueueType = `${contextId}_ServerRequests`;
    sharedMessageQueue.bind({ messageQueueType: responseMessageQueueType });
    sharedMessageQueue.bind({ messageQueueType: requestMessageQueueType });
    httpServerMessageBus.subscribeToHttpRequestMessages({ callback: async ({ httpRequestMessage }) => {
        const { message } = sharedMessageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage });
        await sharedMessageQueue.queueMessage({ message, messageQueueType: requestMessageQueueType });
    }});
    Object.defineProperty(this, 'publishMessage', { configurable: false, writable: false, value: async ({ message }) => {
        await sharedMessageQueue.queueMessage({ message, messageQueueType: responseMessageQueueType });
    }});
    Object.defineProperty(this, 'subscribeToMessages', { configurable: false, writable: false, value: ({ callback }) => {
        sharedMessageQueue.dequeueMessage({ messageQueueType: requestMessageQueueType }).then( async ({ message }) => {
            await callback({ message });
            this.subscribeToMessages({ callback });
        });
    }});
};
ServerMessageBus.prototype.publishMessage = async function({ message }) { };
ServerMessageBus.prototype.subscribeToMessages = function ({ callback }) { };
module.exports = { ServerMessageBus };