const { Factory } = require('../factory.js');
const factory = new Factory();
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageMetadata } = require('C:\\component\\lib\\messagemetadata.js');
/**
* IsSingleton: false 
* Create MessageMetadata 
* @param {scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: MessageMetadata, variableName:'messageMetadata', singleton: false });
    container.config({recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createSenderAddress({scopeId,senderHost,senderPort}));
container.config(createRecipientAddress({scopeId,recipientHost,recipientPort}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageMetadata };
