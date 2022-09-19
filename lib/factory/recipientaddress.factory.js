const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\recipientaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: RecipientAddressFactoryContainer.singleton
* Create RecipientAddress
* @param {factoryContainerBindingName,recipientHost,recipientPort}
*/
function createRecipientAddress({factoryContainerBindingName,recipientHost,recipientPort}) {
    const args = {factoryContainerBindingName,recipientHost,recipientPort};
    const binding = RecipientAddressFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createRecipientAddress };
