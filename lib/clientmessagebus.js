function ClientMessageBus({ httpClientRequestMessageBus, httpClientResponseMessageBus, webSocketClientRequestMessagebus, webSocketClientResponseMessageBus, messageConverter }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await httpClientRequestMessageBus.publish(messageConverter.convertMessageToHttpRequestMessage({ message }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        httpClientResponseMessageBus.subscribe({ callback: async ({ httpResponseMessage }) => {
            await callback(messageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage }));
        }});
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await webSocketClientRequestMessagebus.publish(messageConverter.convertMessageToWebSocketRequestMessage({ message }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        webSocketClientResponseMessageBus.subscribe({ callback: async ({ webSocketResponseMessage }) => {
            await callback(messageConverter.convertWebSocketResponseMessageToMessage({ webSocketResponseMessage }));
        }});
    }});
};
ClientMessageBus.prototype.publish = async function({ message }) { };
ClientMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ClientMessageBus };
