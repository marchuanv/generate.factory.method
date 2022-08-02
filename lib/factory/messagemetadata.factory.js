const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageMetadata } = require('C:\\component\\lib\\messagemetadata.js');
/**
* Create MessageMetadata
* @param {recipientHost,recipientPort,metadata,senderHost,senderPort}
*/
function createMessageMetadata({recipientHost,recipientPort,metadata,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageMetadata, variableName:'messageMetadata', singleton: false });
    container.config({recipientHost,recipientPort,metadata,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageMetadata };
