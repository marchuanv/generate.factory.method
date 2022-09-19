const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\senderaddress.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: SenderAddressFactoryContainer.singleton
* Create SenderAddress
* @param {senderHost,senderPort}
*/
function createSenderAddress({senderHost,senderPort}) {
    const args = {senderHost,senderPort};
    const binding = SenderAddressFactoryContainer.bindings[scopeId];
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
module.exports = { createSenderAddress };
