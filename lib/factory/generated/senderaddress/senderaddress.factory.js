const factory = require('../../factory.js');

/**
* Create SenderAddress
* @param {senderHost,senderPort,factoryContainerBindingName}
*/
function createSenderAddress({senderHost,senderPort,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//senderaddress//senderaddress.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {senderHost,senderPort} });
}
module.exports = { createSenderAddress };
