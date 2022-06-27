const { MessageHandler } = require("./messagehandler");
const { MessageBus } = require('./messagebus');
const { UserIdentity } = require('./useridentity');
const { MessageFactory } = require('./messagefactory');
const { HttpMessageHandler } = require('./http/httpmessagehandler');
const { HttpMessageFactory } = require('./http/httpmessagefactory');
const { Encryption } = require('./encryption');
const { HttpConnection } = require('./http/httpconnection');
const { SubscriptionFactory } = require('./subscriptionfactory');
const { HttpRequestQueue } = require("./http/httprequestqueue");
function MessageBusFactory() {
  Object.defineProperty(this, 'createsecure', { writable: false, value: async ({ userid, secret }) => {
      const userIdentity = new UserIdentity({ userid });
      if (!(await userIdentity.isRegistered())) {
          await userIdentity.register({ secret });
      }
      await userIdentity.authenticate({ secret });
      const encryption = new Encryption({ userIdentity });
      const messageFactory = new MessageFactory(encryption);
      const httpRequestQueue = new HttpRequestQueue();
      const httpConnection = new HttpConnection({ httpRequestQueue });
      const subscriptionFactory = new SubscriptionFactory();
      const httpMessageFactory = new HttpMessageFactory({ messageFactory });
      const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue });
      const messageHandler = new MessageHandler({ httpMessageHandler, httpMessageFactory });
      return new MessageBus({ messageHandler, subscriptionFactory });
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
