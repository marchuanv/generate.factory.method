const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\recipientaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: RecipientAddressFactoryContainer.singleton
* Create RecipientAddress
* @param {recipientHost,recipientPort}
*/
function createRecipientAddress({recipientHost,recipientPort}) {
    const args = {recipientHost,recipientPort};
    const binding = RecipientAddressFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createRecipientAddress };
