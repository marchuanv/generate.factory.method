const { ClientMessageBus } = require('./clientmessagebus.prototype');
ClientMessageBus.prototype.constructor = function({ clientRequestMessageBus, clientResponseMessageBus, messageConverter }) {
    if (httpClientRequestMessageBus && httpClientResponseMessageBus) {
      Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
          await httpClientRequestMessageBus.publish(messageConverter.convertMessageToHttpRequestMessage({ message }));
      }});
      Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
          httpClientResponseMessageBus.subscribe({ callback: async ({ httpResponseMessage }) => {
              await callback(messageConverter.convertHttpResponseMessageToMessage({ httpResponseMessage }));
          }});
      }});
      return;
    }
    if (webSocketClientRequestMessagebus && webSocketClientResponseMessageBus){
      Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ message }) => {
          await webSocketClientRequestMessagebus.publish(messageConverter.convertMessageToWebSocketRequestMessage({ message }));
      }});
      Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
          webSocketClientResponseMessageBus.subscribe({ callback: async ({ webSocketResponseMessage }) => {
              await callback(messageConverter.convertWebSocketResponseMessageToMessage({ webSocketResponseMessage }));
          }});
      }});
      return;
    }
};
