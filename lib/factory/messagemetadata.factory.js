const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagemetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageMetadataFactoryContainer.singleton
* Create MessageMetadata
* @param {recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {recipientHost,recipientPort,metadata,token,senderHost,senderPort};
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
