const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagecontentmetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageContentMetadataFactoryContainer.singleton
* Create MessageContentMetadata
* @param {factoryContainerBindingName,scopeId,data}
*/
function createMessageContentMetadata({factoryContainerBindingName,scopeId,data}) {
    const ctorArgs = {factoryContainerBindingName,scopeId,data};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageContentMetadata };
