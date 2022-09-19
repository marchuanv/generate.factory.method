const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\recipientaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: RecipientAddressFactoryContainer.singleton
* Create RecipientAddress
* @param {factoryContainerBindingName,recipientHost,recipientPort}
*/
function createRecipientAddress({factoryContainerBindingName,recipientHost,recipientPort}) {
    const ctorArgs = {factoryContainerBindingName,recipientHost,recipientPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createRecipientAddress };
