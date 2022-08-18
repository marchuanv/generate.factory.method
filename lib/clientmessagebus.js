function ClientMessageBus({ messageQueue, logger, httpClientMessageBus, messageConverter, contextId }) {
    const responseQueueName = `${contextId}_ClientResponses`;
    const requestQueueName = `${contextId}_ClientRequests`;
    messageQueue.bind({ queueName: responseQueueName });
    messageQueue.bind({ queueName: requestQueueName });
    Object.defineProperty(this, 'publishMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpRequestMessage } = messageConverter.convertMessageToHttpRequestMessage({ message });
        await httpClientMessageBus.publishHttpRequestMessage({ httpRequestMessage });
    }});
    Object.defineProperty(this, 'subscribeToMessages', { configurable: false, writable: false, value: ({ callback }) => {
        httpClientMessageBus.subscribeToHttpResponseMessages({ callback: async ({ httpResponseMessage }) => {
            const { message } = messageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage });
            await callback({ message });
        }});
    }});
};
ClientMessageBus.prototype.publishMessage = async function({ message }) { };
ClientMessageBus.prototype.subscribeToMessages = function ({ callback }) { };
module.exports = { ClientMessageBus };