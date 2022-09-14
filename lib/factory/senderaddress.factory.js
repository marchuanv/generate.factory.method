const { Factory } = require('../factory.js');
const { SenderAddressFactoryContainer } = require('C:\\component\\lib\\factory\\senderaddress.factory.container.json');
const { SenderAddress } = require('C:\\component\\lib\\senderaddress.prototype.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');

const factory = new Factory(SenderAddressFactoryContainer);

/**
* IsSingleton: SenderAddressFactoryContainer.singleton
* Create SenderAddress
* @param {scopeId,senderHost,senderPort}
*/
function createSenderAddress({scopeId,senderHost,senderPort}) {
    const args = {scopeId,senderHost,senderPort};
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
