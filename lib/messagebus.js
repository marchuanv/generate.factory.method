function MessageBus({ messageHandlerQueue, subscriptionMessage }) {
    // messageHandler.receiveFromQueue({ callback: async ({ requestMessage }) => {
    //   const { channel, action } = requestMessage.getContentMetadata(); // subscription message
    //   const data = requestMessage.getContent();
    //   const { senderHost, senderPort } = requestMessage.getSenderAddress();
    //   if (channel && action === 'register') {
        
    //   }
    //   messageHandler.respond({ data: 'success', metadata: {} });
    // }});
    // Object.defineProperty(this, 'publish', { configurable: false, writable: false, value: async ({ data }) => { //fire and forget
    //   const channel = subscriptionMessage.getChannelName();
    //   await messageHandler.sendToQueue({ data, metadata: { channel } });
    // }});
    // messageHandler.sendToQueue({ data: subscriptionMessage.getContent(), metadata: subscriptionMessage.getContentMetadata()});
};
MessageBus.prototype.publish = function({ data }) {};
module.exports = { MessageBus };
