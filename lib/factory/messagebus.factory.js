const factory = require('./factory.js');
const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
/**
* Create MessageBus
* @param {secret,messageQueueTypeCode,senderHost,senderPort,recipientHost,recipientPort,channel,userId}
*/
function createMessageBus({secret,messageQueueTypeCode,senderHost,senderPort,recipientHost,recipientPort,channel,userId}) {
    const container = factory.createContainer({ type: MessageBus, variableName:'messageBus', singleton: false });
    container.config({secret,messageQueueTypeCode,senderHost,senderPort,recipientHost,recipientPort,channel,userId});
    container.config(createRecipientAddress({recipientHost,recipientPort}));
container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageHandlerQueue({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createMessageBus };
