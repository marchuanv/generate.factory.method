const { Factory } = require('../factory.js');
const factory = new Factory();

const { RecipientAddressFactoryContainer } = require('C:\\component\\lib\\factory\\recipientaddress.container.json');
const { RecipientAddress } = require('C:\\component\\lib\\recipientaddress.prototype.js');

/**
* IsSingleton: RecipientAddressFactoryContainer.singleton
* Create RecipientAddress
* @param {scopeId,recipientHost,recipientPort}
*/
function createRecipientAddress({scopeId,recipientHost,recipientPort}) {
    const args = {scopeId,recipientHost,recipientPort};
    const { scopeId } = args;
    const binding = RecipientAddressFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, RecipientAddressFactoryContainer);
}
module.exports = { createRecipientAddress };
