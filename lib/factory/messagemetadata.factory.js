const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagemetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageMetadataFactoryContainer.singleton
* Create MessageMetadata
* @param {factoryContainerBindingName,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({factoryContainerBindingName,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {factoryContainerBindingName,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = MessageMetadataFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createMessageMetadata };
