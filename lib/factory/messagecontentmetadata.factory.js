const { Factory } = require('../factory.js');
const factory = new Factory();

const { MessageContentMetadataFactoryContainer } = require('C:\\component\\lib\\factory\\messagecontentmetadata.container.json');
const { MessageContentMetadata } = require('C:\\component\\lib\\messagecontentmetadata.prototype.js');

/**
* IsSingleton: MessageContentMetadataFactoryContainer.singleton
* Create MessageContentMetadata
* @param {scopeId,data}
*/
function createMessageContentMetadata({scopeId,data}) {
    const args = {scopeId,data};
    const { scopeId } = args;
    const binding = MessageContentMetadataFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, MessageContentMetadataFactoryContainer);
}
module.exports = { createMessageContentMetadata };
