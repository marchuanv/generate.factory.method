const { Factory } = require('../factory.js');
const { ClientMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.container.json');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.prototype.js');
const { createClientMessageBus } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.js');

const factory = new Factory(ClientMessageBusFactoryContainer);

/**
* IsSingleton: ClientMessageBusFactoryContainer.singleton
* Create ClientMessageBus
* @param {scopeId,clientRequestMessageBus,clientResponseMessageBus}
*/
function createClientMessageBus({scopeId,clientRequestMessageBus,clientResponseMessageBus}) {
    const args = {scopeId,clientRequestMessageBus,clientResponseMessageBus};
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
