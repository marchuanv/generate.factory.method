function MessageBus({ messageHandler, subscription }) {
    messageHandler.receive({ callback: async ({ requestMessage }) => {
      const data = requestMessage.getContent();
      const { senderHost, senderPort } = requestMessage.getSenderAddress();
      await subscription.receiveData({ senderHost, senderPort, data });
      const channel = subscription.getChannelName();
      messageHandler.respond({ data: 'success', metadata: { channel } });
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => { //fire and forget
      const channel = subscription.getChannelName();
      await messageHandler.send({ data, metadata: { channel } });
    }});
};
MessageBus.prototype.publish = function({ data }) {};
module.exports = { MessageBus };
