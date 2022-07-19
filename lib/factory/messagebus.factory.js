const factory = require('./factory.js');
const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createSubscriptionMessage } = require('C:\\component\\lib\\factory\\subscriptionmessage.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
/**
* Create MessageBus
* @param {token,messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName}
*/
function createMessageBus({token,messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName}) {
    const container = factory.createContainer({ type: MessageBus, variableName:'messageBus', singleton: false });
    container.config({token,messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort,data,metadata,messageStatusCode,channelName});
    container.config(createSubscriptionMessage({recipientHost,recipientPort,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}));
container.config(createMessageHandler({token,messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageBus };
