function ClientMessageBus({ messageQueue, logger, httpClientMessageBus, httpClientRequestsMessageBus, httpClientResponseMessageBus, messageConverter }) {
    const responseQueueName = 'ClientResponses';
    const requestQueueName = 'ClientRequests';
    messageQueue.bind({ queueName: responseQueueName });
    messageQueue.bind({ queueName: requestQueueName });
    httpClientMessageBus.start();
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        const { httpRequestMessage } = messageConverter.convertMessageToHttpRequestMessage({ message });
        await httpClientRequestsMessageBus.publish({ httpRequestMessage });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        httpClientResponseMessageBus.subscribe({ callback: async ({ httpResponseMessage }) => {
            const { message } = messageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage });
            await callback({ message });
        }});
    }});
};
ClientMessageBus.prototype.publish = async function({ message }) { };
ClientMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ClientMessageBus };