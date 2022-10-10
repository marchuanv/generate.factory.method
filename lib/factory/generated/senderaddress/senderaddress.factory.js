const { Factory } = require('../../factory.js');

/**
* Create SenderAddress
* @param {senderHost,senderPort,factoryContainerBindingName}
*/
function createSenderAddress({senderHost,senderPort,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//senderaddress//senderaddress.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {senderHost,senderPort} });
}
module.exports = { createSenderAddress };
