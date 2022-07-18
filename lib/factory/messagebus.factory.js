const { FactoryContainer } = require('./factory.container.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createSubscriptionMessage } = require('C:\\component\\lib\\factory\\subscriptionmessage.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({userId,senderHost,senderPort,data,token,metadata,messageStatusCode,channelName}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,senderHost,senderPort,data,token,metadata,messageStatusCode,channelName});
    factoryContainer.add(createSubscriptionMessage({senderHost,senderPort,userId,data,token,metadata,messageStatusCode,channelName}));
factoryContainer.add(createMessageHandler({userId,senderHost,senderPort}));
    const messageBus = new MessageBus(factoryContainer);
    factoryContainer.add({messageBus});
    return factoryContainer;
}
module.exports = { createMessageBus };
