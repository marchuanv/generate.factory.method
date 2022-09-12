function ServerMessageBus({ httpServerResponseMessageBus, httpServerRequestMessageBus, webSocketServerRequestMessageBus, webSocketServerResponseMessageBus, messageConverter }) {
    if (httpServerRequestMessageBus && httpServerResponseMessageBus){
      Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
          await httpServerResponseMessageBus.publish(messageConverter.convertMessageToHttpResponseMessage({ message }));
      }});
      Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
          httpServerRequestMessageBus.subscribe({ callback: async ({ httpRequestMessage }) => {
              await callback(messageConverter.convertHttpRequestMessageToMessage({ httpRequestMessage }));
          }});
      }});
      return;
    }
    if (webSocketServerRequestMessageBus && webSocketServerResponseMessageBus){
      Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
          await webSocketServerResponseMessageBus.publish(messageConverter.convertMessageToWebSocketResponseMessage({ message }));
      }});
      Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
          webSocketServerRequestMessageBus.subscribe({ callback: async ({ webSocketRequestMessage }) => {
              await callback(messageConverter.convertWebSocketRequestMessageToMessage({ webSocketRequestMessage }));
          }});
      }});
      return;
    }
};
ServerMessageBus.prototype.publish = async function({ message }) { };
ServerMessageBus.prototype.subscribe = function ({ callback }) { };
module.exports = { ServerMessageBus };
