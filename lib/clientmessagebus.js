function ClientMessageBus({ sharedMessageQueue, httpClientMessageBus, sharedMessageConverter, contextId }) {
    const responseQueueName = `${contextId}_ClientResponses`;
    const requestQueueName = `${contextId}_ClientRequests`;
    sharedMessageQueue.bind({ queueName: responseQueueName });
    sharedMessageQueue.bind({ queueName: requestQueueName });
    Object.defineProperty(this, 'publishMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpRequestMessage } = sharedMessageConverter.convertMessageToHttpRequestMessage({ message });
        await httpClientMessageBus.publishHttpRequestMessage({ httpRequestMessage });
    }});
    Object.defineProperty(this, 'subscribeToMessages', { configurable: false, writable: false, value: ({ callback }) => {
        httpClientMessageBus.subscribeToHttpResponseMessages({ callback: async ({ httpResponseMessage }) => {
            const { message } = sharedMessageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage });
            await callback({ message });
        }});
    }});
};
ClientMessageBus.prototype.publishMessage = async function({ message }) { };
ClientMessageBus.prototype.subscribeToMessages = function ({ callback }) { };
module.exports = { ClientMessageBus };