const { MessageHandler } = require("./messagehandler");
const { SubscriptionFactory } = require("./subscriptionfactory");
function MessageBus({ messageHandler, subscriptionFactory }) {
    if (!(messageHandler instanceof MessageHandler)) {
      throw new Error("the 'messageHandler' parameter is null, undefined or not of type: MessageHandler");
    }
    if (!(subscriptionFactory instanceof SubscriptionFactory)) {
      throw new Error("the 'subscriptionFactory' parameter is null, undefined or not of type: SubscriptionFactory");
    }
    messageHandler.receive({ callback: ({ message }) => {
      const { channelName, data } = message.getContent();
      const { address } = message.getSenderAddress();
      subscriptionFactory.get({ channelName }).receiveData({ from: address, data });
    }});
    Object.defineProperty(this, 'subscribe', { writable: false, value: ({ channelName, callback }) => {
      subscriptionFactory.get({ channelName }).onDataReceived({ callback });
    }});
    Object.defineProperty(this, 'publish', { writable: false, value: async ({ channelName, data }) => { //fire and forget
      throw new Error('find the recipient address somehow');
      await messageHandler.send({ recipientAddress, data: { channelName, data,  } });
    }});
};
MessageBus.prototype.subscribe = async function({ channelName, callback }) {};
MessageBus.prototype.publish = function({ channelName, data }) {};
module.exports = { MessageBus };
