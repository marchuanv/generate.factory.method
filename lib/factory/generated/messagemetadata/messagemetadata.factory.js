const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//messagemetadata//messagemetadata.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create MessageMetadata
* @param {recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}
*/
function createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createMessageMetadata };
