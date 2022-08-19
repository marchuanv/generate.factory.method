function ClientMessageBus({ messageQueue, logger, httpClientMessageBus, httpClientRequestsMessageBus, httpClientResponseMessageBus, messageConverter }) {
    const responseQueueName = 'ClientResponses';
    const requestQueueName = 'ClientRequests';
    messageQueue.bind({ queueName: responseQueueName });
    messageQueue.bind({ queueName: requestQueueName });
    httpClientMessageBus.start();
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await httpClientRequestsMessageBus.publish(messageConverter.convertMessageToHttpRequestMessage({ message }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        httpClientResponseMessageBus.subscribe({ callback: async ({ httpResponseMessage }) => {
            await callback(messageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage }));
        }});
    }});
};
ClientMessageBus.prototype.publish = async function({ message }) { };
ClientMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ClientMessageBus };