const { MessageHandler } = require("./messagehandler");
const { Message } = require("./message");
const { SubscriptionFactory } = require("./subscriptionfactory");
function MessageBus({ address, messageHandler, subscriptionFactory }) {
    if (!(messageHandler instanceof MessageHandler)) {
      throw new Error("the 'messageHandler' parameter is null, undefined or not of type: MessageHandler");
    }
    if (!(subscriptionFactory instanceof SubscriptionFactory)) {
      throw new Error("the 'subscriptionFactory' parameter is null, undefined or not of type: SubscriptionFactory");
    }
    if (!address) {
      throw new Error("the 'address' parameter is null, undefined");
    }
    messageHandler.receive({ callback: ({ message }) => {
      if (!(message instanceof Message)) {
        throw new Error("the 'message' parameter is null, undefined or not of type: Message");
      }
      const { channelName, data } = message.getContent();
      const from = message.getFromHost();
      subscriptionFactory.get({ channelName }).receiveData({ from, data });
    }});
    Object.defineProperty(this, 'subscribe', { writable: false, value: ({ channelName, callback }) => {
      subscriptionFactory.get({ channelName }).onDataReceived({ callback });
    }});
    Object.defineProperty(this, 'publish', { writable: false, value: async ({ channelName, data }) => { //fire and forget
      await messageHandler.send({ address, data: { channelName, data,  } });
    }});
};
MessageBus.prototype.subscribe = async function({ channelName, callback }) {};
MessageBus.prototype.publish = function({ channelName, data }) {};
module.exports = { MessageBus };
