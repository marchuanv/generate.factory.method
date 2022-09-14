const { Factory } = require('../factory.js');
const { MessageMetadataFactoryContainer } = require('C:\\component\\lib\\factory\\messagemetadata.factory.container.json');
const { MessageMetadata } = require('C:\\component\\lib\\messagemetadata.prototype.js');
const { createMessageMetadata } = require('C:\\component\\lib\\factory\\messagemetadata.factory.js');

const factory = new Factory(MessageMetadataFactoryContainer);

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
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createMessageMetadata };
