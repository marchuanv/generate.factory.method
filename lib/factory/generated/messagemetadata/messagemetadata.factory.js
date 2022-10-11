const { factory } = require('../../factory.js');

/**
* Create MessageMetadata
* @param {recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}
*/
function createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//messagemetadata//messagemetadata.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createMessageMetadata };
