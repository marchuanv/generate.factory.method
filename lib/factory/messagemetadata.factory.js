const { Factory } = require('../factory.js');
const factory = new Factory();
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageMetadataFactoryContainer } = require('C:\\component\\lib\\factory\\messagemetadata.container.json');
const { MessageMetadata } = require('C:\\component\\lib\\messagemetadata.prototype.js');

/**
* IsSingleton: MessageMetadataFactoryContainer.singleton
* Create MessageMetadata
* @param {scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {scopeId,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = MessageMetadataFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, MessageMetadataFactoryContainer);
}
module.exports = { createMessageMetadata };
