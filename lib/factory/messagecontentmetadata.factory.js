const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageContentMetadataFactoryContainer.singleton
* Create MessageContentMetadata
* @param {scopeId,data}
*/
function createMessageContentMetadata({scopeId,data}) {
    const args = {scopeId,data};
    const binding = MessageContentMetadataFactoryContainer.bindings[scopeId];
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
module.exports = { createMessageContentMetadata };
