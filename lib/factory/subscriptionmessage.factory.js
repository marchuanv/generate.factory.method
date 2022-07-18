const { FactoryContainer } = require('./factory.container.js');
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { SubscriptionMessage } = require('C:\\component\\lib\\subscriptionmessage.js');
function createSubscriptionMessage({senderHost,senderPort,userId,data,token,metadata,messageStatusCode,channelName}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({senderHost,senderPort,userId,data,token,metadata,messageStatusCode,channelName});
    factoryContainer.add(createMessage({senderHost,senderPort,userId,data,token,metadata,messageStatusCode}));
    const subscriptionMessage = new SubscriptionMessage(factoryContainer);
    factoryContainer.add({subscriptionMessage});
    return factoryContainer;
}
module.exports = { createSubscriptionMessage };
