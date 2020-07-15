const { MessageHandler } = require("./messagehandler");
const { MessageBus } = require('./messagebus');
const { UserIdentity } = require('./useridentity');
const { MessageFactory } = require('./messagefactory');
const { HttpMessageHandler } = require('./http/httpmessagehandler');
const { HttpMessageFactory } = require('./http/httpmessagefactory');
const { Encryption } = require('./encryption');
const { HttpConnection } = require('./http/httpconnection');
const { SubscriptionFactory } = require('./subscriptionfactory')

function MessageBusFactory({ host, port, errorMessages }) {
  const messageFactory = new MessageFactory({ errorMessages });
  const httpConnection = new HttpConnection({ host, port, errorMessages });
  const subscriptionFactory = new SubscriptionFactory();
  Object.defineProperty(this, 'createsecure', { writable: false, value: async ({ userid, secret }) => {
      const userIdentity = new UserIdentity({ userid });
      if (!(await userIdentity.isRegistered())) {
          await userIdentity.register({ secret });
      }
      await userIdentity.authenticate({ secret });
      const encryption = new Encryption({ userIdentity });
      const httpMessageFactory = new HttpMessageFactory({ messageFactory, encryption, errorMessages });
      const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection, errorMessages });
      const messageHandler = new MessageHandler({ httpMessageHandler, httpMessageFactory, errorMessages });
      return new MessageBus({ messageHandler, subscriptionFactory, errorMessages });
  }});
  Object.defineProperty(this, 'createunsecure', { writable: false, value: () => {
    const httpMessageFactory = new HttpMessageFactory({ messageFactory, errorMessages });
    const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection, errorMessages });
    const messageHandler = new MessageHandler({ httpMessageHandler, httpMessageFactory, errorMessages });
    return new MessageBus({ messageHandler, subscriptionFactory, errorMessages });
  }});
};
MessageBusFactory.prototype.createsecure = function({ userid, secret }) {};
MessageBusFactory.prototype.createunsecure = function() {};
module.exports = { MessageBusFactory };
