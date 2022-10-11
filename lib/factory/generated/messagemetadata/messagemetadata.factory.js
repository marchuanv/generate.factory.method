const { Factory } = require('../../factory.js');

/**
* Create MessageMetadata
* @param {recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}
*/
function createMessageMetadata({recipientHost,recipientPort,metadata,token,senderHost,senderPort,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//messagemetadata//messagemetadata.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {recipientHost,recipientPort,metadata,token,senderHost,senderPort} });
}
module.exports = { createMessageMetadata };
