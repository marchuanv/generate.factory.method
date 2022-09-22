const { ServerMessageBus } = require("./servermessagebus.prototype");
ServerMessageBus.prototype.constructor = function({ serverResponseMessageBus, serverRequestMessageBus, messageConverter }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await serverResponseMessageBus.publish(messageConverter.convertMessageToHttpResponseMessage({ message }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        serverRequestMessageBus.subscribe({ callback: async ({ httpRequestMessage }) => {
            await callback(messageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage }));
        }});
    }});
    return;
};
module.exports = { ServerMessageBus };
