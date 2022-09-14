const { Factory } = require('../factory.js');
const { MessageContentMetadataFactoryContainer } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.container.json');
const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.prototype.js');
const { createMessageContentMetadata } = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.js');

const factory = new Factory(MessageContentMetadataFactoryContainer);

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
