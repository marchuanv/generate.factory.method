const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\clientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ClientMessageBusFactoryContainer.singleton
* Create ClientMessageBus
* @param {clientRequestMessageBus,clientResponseMessageBus}
*/
function createClientMessageBus({clientRequestMessageBus,clientResponseMessageBus}) {
    const args = {clientRequestMessageBus,clientResponseMessageBus};
    const binding = ClientMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createClientMessageBus };
