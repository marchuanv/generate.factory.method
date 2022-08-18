function ServerMessageBus({ messageQueue, logger, httpServerMessageBus, messageConverter }) {
    const responseQueueName = 'ServerResponses';
    const requestQueueName = 'ServerRequests';
    Object.defineProperty(this, 'initialise', { configurable: false, writable: false, value: () => {
        messageQueue.bind({ queueName: responseQueueName });
        messageQueue.bind({ queueName: requestQueueName });
        httpServerMessageBus.initialise();
    }});
    Object.defineProperty(this, 'publishMessage', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpResponseMessage } = messageConverter.convertMessageToHttpResponseMessage({ message });
        await httpServerMessageBus.publishHttpResponseMessage({ httpResponseMessage });
    }});
    Object.defineProperty(this, 'subscribeToMessages', { configurable: false, writable: false, value: ({ callback }) => {
        httpServerMessageBus.subscribeToHttpRequestMessages({ callback: async ({ httpRequestMessage }) => {
            const { message } = messageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage });
            await callback({ message });
        }});
    }});
};
ServerMessageBus.prototype.initialise = function() { };
ServerMessageBus.prototype.publishMessage = async function({ message }) { };
ServerMessageBus.prototype.subscribeToMessages = function ({ callback }) { };
module.exports = { ServerMessageBus };