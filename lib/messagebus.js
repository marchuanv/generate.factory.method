function MessageBus({ messageHandler, subscriptionMessage }) {
    const channel = subscriptionMessage.getChannelName();
    messageHandler.send({ data: subscriptionMessage.getContent(), metadata: subscriptionMessage.getContentMetadata()});
    messageHandler.receive({ callback: async ({ requestMessage }) => {
      const data = requestMessage.getContent();
      const { senderHost, senderPort } = requestMessage.getSenderAddress();
      await subscription.receiveData({ senderHost, senderPort, data });
      messageHandler.respond({ data: 'success', metadata: { channel } });
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => { //fire and forget
      await messageHandler.send({ data, metadata: { channel } });
    }});
};
MessageBus.prototype.publish = function({ data }) {};
module.exports = { MessageBus };
