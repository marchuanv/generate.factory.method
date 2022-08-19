function ServerMessageBus({ httpServerResponseMessageBus, httpServerRequestsMessageBus, messageConverter }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await httpServerResponseMessageBus.publish(messageConverter.convertMessageToHttpResponseMessage({ message }));
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