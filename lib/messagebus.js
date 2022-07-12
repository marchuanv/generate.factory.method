function MessageBus({ messageHandler, subscriptionHandler, hostAddress }) {
    messageHandler.receive({ callback: ({ requestMessage }) => {
      const { data } = requestMessage.getContent();
      const { host, port } = requestMessage.getSenderAddress();
      subscriptionHandler.receiveData({ host, port, data });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ callback }) => {
      subscriptionHandler.onDataReceived({ callback });
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => { //fire and forget
      const channel = subscriptionHandler.getChannelName();
      const sender = hostAddress;
      await messageHandler.send({ metadata: { channel, sender }, data });
    }});
};
MessageBus.prototype.subscribe = async function({ channelName, callback }) {};
MessageBus.prototype.publish = function({ channelName, data }) {};
module.exports = { MessageBus };
