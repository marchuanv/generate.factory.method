const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageContentMetadataFactoryContainer.singleton
* Create MessageContentMetadata
* @param {factoryContainerBindingName,scopeId,data}
*/
function createMessageContentMetadata({factoryContainerBindingName,scopeId,data}) {
    const args = {factoryContainerBindingName,scopeId,data};
    const binding = MessageContentMetadataFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createMessageContentMetadata };
