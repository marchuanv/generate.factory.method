const factory = require('./factory.js');
const { createRecipientAddress } = require('D:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSenderAddress } = require('D:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageMetadata } = require('D:\\component\\lib\\messagemetadata.js');
/**
* Create MessageMetadata
* @param {recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageMetadata, variableName:'messageMetadata', singleton: false });
    container.config({recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageMetadata };
