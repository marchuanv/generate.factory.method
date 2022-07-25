const factory = require('./factory.js');
const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { createSubscriptionMessage } = require('C:\\component\\lib\\factory\\subscriptionmessage.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
/**
* Create MessageBus
* @param {messageQueueTypeCode,recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}
*/
function createMessageBus({messageQueueTypeCode,recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}) {
    const container = factory.createContainer({ type: MessageBus, variableName:'messageBus', singleton: false });
    container.config({messageQueueTypeCode,recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName});
    container.config(createSubscriptionMessage({recipientHost,recipientPort,Id,userId,data,senderHost,senderPort,token,metadata,messageStatusCode,channelName}));
container.config(createMessageHandlerQueue({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createMessageBus };
