const { ClientMessageBus } = require('./clientmessagebus.prototype');
ClientMessageBus.prototype.constructor = function({ contextName, clientRequestMessageBus, clientResponseMessageBus, messageConverter }) {
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
        await clientRequestMessageBus.publish(messageConverter.convertMessageToHttpRequestMessage({ message }));
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
        clientResponseMessageBus.subscribe({ callback: async ({ httpResponseMessage }) => {
            await callback(messageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage }));
        }});
    }});
    return;
};
module.exports = { ClientMessageBus };
