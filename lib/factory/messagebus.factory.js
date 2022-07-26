const factory = require('./factory.js');
const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
/**
* Create MessageBus
* @param {remoteBase64RSAPublicKey,sharedMessageQueue,messageQueueTypeCode,senderHost,senderPort,recipientHost,recipientPort,channel,userId}
*/
function createMessageBus({remoteBase64RSAPublicKey,sharedMessageQueue,messageQueueTypeCode,senderHost,senderPort,recipientHost,recipientPort,channel,userId}) {
    const container = factory.createContainer({ type: MessageBus, variableName:'messageBus', singleton: false });
    container.config({remoteBase64RSAPublicKey,sharedMessageQueue,messageQueueTypeCode,senderHost,senderPort,recipientHost,recipientPort,channel,userId});
    container.config(createRecipientAddress({recipientHost,recipientPort}));
container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageHandlerQueue({sharedMessageQueue,messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createMessageBus };
