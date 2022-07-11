function MessageBus({ messageHandler, subscriptionHandler }) {
    messageHandler.receive({ callback: ({ message }) => {
      const { channelName, data } = message.getContent();
      const { address } = message.getSenderAddress();
      subscriptionHandler.get({ channelName }).receiveData({ from: address, data });
    }});
    Object.defineProperty(this, 'subscribe', { configurable: false, writable: false, value: ({ channelName, callback }) => {
      subscriptionHandler.get({ channelName }).onDataReceived({ callback });
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ channelName, data }) => { //fire and forget
      await messageHandler.send({ recipientAddress, data: { channelName, data } });
    }});
};
MessageBus.prototype.subscribe = async function({ channelName, callback }) {};
MessageBus.prototype.publish = function({ channelName, data }) {};
module.exports = { MessageBus };
