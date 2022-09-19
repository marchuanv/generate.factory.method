const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\senderaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: SenderAddressFactoryContainer.singleton
* Create SenderAddress
* @param {factoryContainerBindingName,senderHost,senderPort}
*/
function createSenderAddress({factoryContainerBindingName,senderHost,senderPort}) {
    const args = {factoryContainerBindingName,senderHost,senderPort};
    const binding = SenderAddressFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createSenderAddress };
