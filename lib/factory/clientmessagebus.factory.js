const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\clientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ClientMessageBusFactoryContainer.singleton
* Create ClientMessageBus
* @param {factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus}
*/
function createClientMessageBus({factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus}) {
    const args = {factoryContainerBindingName,clientRequestMessageBus,clientResponseMessageBus};
    const binding = ClientMessageBusFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createClientMessageBus };
