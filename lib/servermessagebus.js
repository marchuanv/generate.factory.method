function ServerMessageBus({ sharedMessageQueue, httpServerMessageBus, sharedMessageConverter, contextId }) {
    const responseQueueName = `${contextId}_ServerResponses`;
    const requestQueueName = `${contextId}_ServerRequests`;
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: () => {
        sharedMessageQueue.bind({ QueueName: responseQueueName });
        sharedMessageQueue.bind({ QueueName: requestQueueName });
        httpServerMessageBus.initialise();
    }});
    Object.defineProperty(this, 'publishMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpResponseMessage } = sharedMessageConverter.convertMessageToHttpResponseMessage({ message });
        await httpServerMessageBus.publishHttpResponseMessage({ httpResponseMessage });
    }});
    Object.defineProperty(this, 'subscribeToMessages', { configurable: false, writable: false, value: ({ callback }) => {
        httpServerMessageBus.subscribeToHttpRequestMessages({ callback: async ({ httpRequestMessage }) => {
            const { message } = sharedMessageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage });
            await callback({ message });
        }});
    }});
};
ServerMessageBus.prototype.initialise = function() { };
ServerMessageBus.prototype.publishMessage = async function({ message }) { };
ServerMessageBus.prototype.subscribeToMessages = function ({ callback }) { };
module.exports = { ServerMessageBus };