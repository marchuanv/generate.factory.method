const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagemetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageMetadataFactoryContainer.singleton
* Create MessageMetadata
* @param {factoryContainerBindingName,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({factoryContainerBindingName,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createMessageMetadata };
