const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//recipientaddress//recipientaddress.factory.container.json');
const factory = new Factory(container);

/**
* Create RecipientAddress
* @param {recipientHost,recipientPort,factoryContainerBindingName}
*/
function createRecipientAddress({recipientHost,recipientPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {recipientHost,recipientPort} });
}
module.exports = { createRecipientAddress };
