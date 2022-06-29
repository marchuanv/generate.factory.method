const { MessageHandler } = require("./messagehandler");
const { MessageBus } = require('./messagebus');
const { UserIdentity } = require('./useridentity');
const { MessageFactory } = require('./messagefactory');
const { HttpMessageHandler } = require('./http/httpmessagehandler');
const { HttpMessageFactory } = require('./http/httpmessagefactory');
const { Encryption } = require('./encryption');
const { HttpConnection } = require('./http/httpconnection');
const { SubscriptionFactory } = require('./subscriptionfactory');
const { MessageHandlerFactory } = require("./messagehandlerfactory");
const { HttpMessageHandlerFactory } = require("./http/httpmessagehandlerfactory");
function MessageBusFactory({ hostAddress, timeout }) {
  if (!hostAddress) {
    throw new Error("the 'hostAddress' parameter is null or undefined.");
  }
  if (!timeout) {
    throw new Error("the 'timeout' parameter is null or undefined.");
  }
  Object.defineProperty(this, 'create', { writable: false, value: ({ userid, secret }) => {
    const httpMessageHandlerFactory = new HttpMessageHandlerFactory({ hostAddress, timeout });
    const messageHandlerFactory = new MessageHandlerFactory({ httpMessageHandlerFactory, hostAddress });
    const messageHandler = messageHandlerFactory.createsecure();
    const subscriptionFactory = new SubscriptionFactory();
    return new MessageBus({ hostAddress, messageHandler, subscriptionFactory });
  }});
};
MessageBusFactory.prototype.create = function({ userid, secret }) { };
module.exports = { MessageBusFactory };
