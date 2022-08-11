const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { createSharedUserSessions } = require('C:\\component\\lib\\factory\\sharedusersessions.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
/**
* Create MessageBus
* @param {recipientHost,recipientPort,messageQueueContextId,channel,token,senderHost,senderPort}
*/
function createMessageBus({recipientHost,recipientPort,messageQueueContextId,channel,token,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageBus, variableName:'messageBus', singleton: false });
    container.config({recipientHost,recipientPort,messageQueueContextId,channel,token,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createSharedUserSessions({}));
container.config(createMessageHandlerQueue({messageQueueContextId}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageBus };
