const { Factory } = require('../factory.js');
const factory = new Factory();
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageMetadata } = require('C:\\component\\lib\\messagemetadata.prototype.js');
const getMessageMetadataFactoryConfig = require('C:\\component\\lib\\factory\\messagemetadata.factory.config.js');
/**
* IsSingleton: false 
* Create MessageMetadata 
* @param {scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: MessageMetadata, variableName:'messageMetadata', singleton: false });
    container.config(getMessageMetadataFactoryConfig());
    container.reference({recipientHost,recipientPort,metadata,token,senderHost,senderPort});
        container.reference(createSenderAddress({scopeId,senderHost,senderPort}));
container.reference(createRecipientAddress({scopeId,recipientHost,recipientPort}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createMessageMetadata };
