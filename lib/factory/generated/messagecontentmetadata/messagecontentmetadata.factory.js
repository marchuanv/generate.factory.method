const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\messagecontentmetadata\\messagecontentmetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageContentMetadataFactoryContainer.singleton
* Create MessageContentMetadata
* @param {factoryContainerBindingName,data}
*/
function createMessageContentMetadata({factoryContainerBindingName,data}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName,data} });
}
module.exports = { createMessageContentMetadata };
