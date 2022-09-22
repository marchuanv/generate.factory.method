const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagemetadata.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageMetadataFactoryContainer.singleton
* Create MessageMetadata
* @param {recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createMessageMetadata };
