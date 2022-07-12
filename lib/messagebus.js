function MessageBus({ messageHandler, subscription, hostAddress }) {
    messageHandler.receive({ callback: async ({ requestMessage }) => {
      const data = requestMessage.getContent();
      const { host, port } = requestMessage.getSenderAddress();
      await subscription.receiveData({ host, port, data });
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => { //fire and forget
      const channel = subscription.getChannelName();
      const sender = hostAddress;
      await messageHandler.send({ metadata: { channel, sender }, data });
    }});
};
MessageBus.prototype.subscribe = async function({ channelName, callback }) {};
MessageBus.prototype.publish = function({ channelName, data }) {};
module.exports = { MessageBus };
