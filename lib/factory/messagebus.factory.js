const { FactoryContainer } = require('./factory.container.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createSubscriptionMessage } = require('C:\\component\\lib\\factory\\subscriptionmessage.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({token,isSyncedMessageQueueTypes,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({token,isSyncedMessageQueueTypes,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName});
    factoryContainer.add(createSubscriptionMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}));
factoryContainer.add(createMessageHandler({token,isSyncedMessageQueueTypes,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort}));
    const messageBus = new MessageBus(factoryContainer);
    factoryContainer.add({messageBus});
    return factoryContainer;
}
module.exports = { createMessageBus };
