const { FactoryContainer } = require('./factory.container.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createSubscriptionMessage } = require('C:\\component\\lib\\factory\\subscriptionmessage.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({token,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName}) {
    let container = new FactoryContainer();
    container.add({token,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName});
    container.add(createSubscriptionMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}));
container.add(createMessageHandler({token,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort}));
    const messageBus = new MessageBus(container);
    container.add({messageBus});
    return container;
}
module.exports = { createMessageBus };
