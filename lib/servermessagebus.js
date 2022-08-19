function ServerMessageBus({ messageQueue, logger, httpServerMessageBus, httpServerResponseMessageBus, httpServerRequestsMessageBus, messageConverter }) {
    const responseQueueName = 'ServerResponses';
    const requestQueueName = 'ServerRequests';
    messageQueue.bind({ queueName: responseQueueName });
    messageQueue.bind({ queueName: requestQueueName });
    httpServerMessageBus.start();
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpResponseMessage } = messageConverter.convertMessageToHttpResponseMessage({ message });
        await httpServerResponseMessageBus.pusblish({ httpResponseMessage });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        httpServerRequestsMessageBus.subscribe({ callback: async ({ httpRequestMessage }) => {
            const { message } = messageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage });
            await callback({ message });
        }});
    }});
};
ServerMessageBus.prototype.initialise = function() { };
ServerMessageBus.prototype.publishMessage = async function({ message }) { };
ServerMessageBus.prototype.subscribeToMessages = function ({ callback }) { };
module.exports = { ServerMessageBus };