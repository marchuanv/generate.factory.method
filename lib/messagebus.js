function MessageBus({ messageHandler, subscriptionHandler }) {
    messageHandler.receive({ callback: ({ message }) => {
      const { data } = message.getContent();
      const { host, port } = message.getSenderAddress();
      subscriptionHandler.receiveData({ host, port, data });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
     // subscriptionHandler.
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => { //fire and forget
      const channel = subscriptionHandler.getChannelName();
      await messageHandler.send({ metadata: { channel }, data });
    }});
};
MessageBus.prototype.subscribe = async function({ channelName, callback }) {};
MessageBus.prototype.publish = function({ channelName, data }) {};
module.exports = { MessageBus };
