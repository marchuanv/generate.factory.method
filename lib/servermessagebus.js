function ServerMessageBus({ messageQueue, logger, httpServerMessageBus, httpServerResponseMessageBus, httpServerRequestsMessageBus, messageConverter }) {
    const responseQueueName = 'ServerResponses';
    const requestQueueName = 'ServerRequests';
    messageQueue.bind({ queueName: responseQueueName });
    messageQueue.bind({ queueName: requestQueueName });
    httpServerMessageBus.start();
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await httpServerResponseMessageBus.pusblish(messageConverter.convertMessageToHttpResponseMessage({ message }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        httpServerRequestsMessageBus.subscribe({ callback: async ({ httpRequestMessage }) => {
            await callback(messageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage }));
        }});
    }});
};
ServerMessageBus.prototype.publish = async function({ message }) { };
ServerMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ServerMessageBus };