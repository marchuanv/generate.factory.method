const { Factory } = require('../factory.js');
const factory = new Factory();

const { SenderAddressFactoryContainer } = require('C:\\component\\lib\\factory\\senderaddress.container.json');
const { SenderAddress } = require('C:\\component\\lib\\senderaddress.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, SenderAddressFactoryContainer);
}
module.exports = { createSenderAddress };
