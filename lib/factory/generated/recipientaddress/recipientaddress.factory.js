const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\recipientaddress\\recipientaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: RecipientAddressFactoryContainer.singleton
* Create RecipientAddress
* @param {recipientHost,recipientPort}
*/
function createRecipientAddress({recipientHost,recipientPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {recipientHost,recipientPort} });
}
module.exports = { createRecipientAddress };
