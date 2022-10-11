const { Factory } = require('../../factory.js');

/**
* Create RecipientAddress
* @param {recipientHost,recipientPort,factoryContainerBindingName}
*/
function createRecipientAddress({recipientHost,recipientPort,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {recipientHost,recipientPort} });
}
module.exports = { createRecipientAddress };
