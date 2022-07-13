function MessageBus({ messageHandler, subscription }) {
    messageHandler.receive({ callback: async ({ requestMessage }) => {
      const data = requestMessage.getContent();
      const { senderHost, senderPort } = requestMessage.getSenderAddress();
      await subscription.receiveData({ senderHost, senderPort, data });
    }});
    Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => { //fire and forget
      const channel = subscription.getChannelName();
      await messageHandler.send({ metadata: { channel }, data });
    }});
};
MessageBus.prototype.publish = function({ data }) {};
module.exports = { MessageBus };
