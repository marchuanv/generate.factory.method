const factory = require('./factory.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createSubscriptionMessage } = require('C:\\component\\lib\\factory\\subscriptionmessage.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({token,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName}) {
    let container = factory.createContainer(MessageBus);
    container.add({token,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName});
    container.add(createSubscriptionMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}));
container.add(createMessageHandler({token,recipientHost,recipientPort,userId,senderHost,senderPort}));
    const messageBus = new MessageBus(container);
    container.add({messageBus});
    return container;
}
module.exports = { createMessageBus };
