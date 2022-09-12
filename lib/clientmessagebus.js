function ClientMessageBus({ httpClientRequestMessageBus, httpClientResponseMessageBus, webSocketClientRequestMessagebus, webSocketClientResponseMessageBus, messageConverter }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await httpClientRequestMessageBus.publish(messageConverter.convertMessageToHttpRequestMessage({ message }));
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
