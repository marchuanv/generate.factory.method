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
  Object.defineProperty(this, 'createsecure', { writable: false, value: async ({ address, userid, secret }) => {
      const userIdentity = new UserIdentity({ userid });
      if (!(await userIdentity.isRegistered())) {
          await userIdentity.register({ secret });
      }
      await userIdentity.authenticate({ secret });
      const encryption = new Encryption({ userIdentity });
      const messageFactory = new MessageFactory(encryption);
      const httpRequestQueue = new HttpRequestQueue();
      const httpConnection = new HttpConnection({ httpRequestQueue });
      const httpMessageFactory = new HttpMessageFactory({ messageFactory });
      const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue });
      const messageHandler = new MessageHandler({ httpMessageHandler, httpMessageFactory });
      const subscriptionFactory = new SubscriptionFactory();
      return new MessageBus({ address, messageHandler, subscriptionFactory });
  }});
  Object.defineProperty(this, 'createunsecure', { writable: false, value: ({ address }) => {
    const messageFactory = new MessageFactory();
    const httpMessageFactory = new HttpMessageFactory({ messageFactory });
    const httpRequestQueue = new HttpRequestQueue();
    const httpConnection = new HttpConnection({ httpRequestQueue });
    const httpMessageHandler = new HttpMessageHandler({ httpMessageFactory, httpConnection, httpRequestQueue });
    const messageHandler = new MessageHandler({ httpMessageHandler, httpMessageFactory });
    const subscriptionFactory = new SubscriptionFactory();
    return new MessageBus({ address, messageHandler, subscriptionFactory });
  }});
};
MessageBusFactory.prototype.createsecure = function({ address, userid, secret }) { };
MessageBusFactory.prototype.createunsecure = function({ address }) { };
module.exports = { MessageBusFactory };
