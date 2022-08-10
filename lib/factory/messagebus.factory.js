const factory = require('./factory.js');
const { createRecipientAddress } = require('D:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createMessageHandlerQueue } = require('D:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { createSharedUserSessions } = require('D:\\component\\lib\\factory\\sharedusersessions.factory.js');
const { createSenderAddress } = require('D:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageBus } = require('D:\\component\\lib\\messagebus.js');
/**
* Create MessageBus
* @param {recipientHost,recipientPort,messageQueueTypeCode,channel,senderHost,senderPort}
*/
function createMessageBus({recipientHost,recipientPort,messageQueueTypeCode,channel,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageBus, variableName:'messageBus', singleton: false });
    container.config({recipientHost,recipientPort,messageQueueTypeCode,channel,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createSharedUserSessions({}));
container.config(createMessageHandlerQueue({messageQueueTypeCode}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageBus };
