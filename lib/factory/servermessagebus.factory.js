const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\servermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: ServerMessageBusFactoryContainer.singleton
* Create ServerMessageBus
* @param {factoryContainerBindingName,serverResponseMessageBus,serverRequestMessageBus}
*/
function createServerMessageBus({factoryContainerBindingName,serverResponseMessageBus,serverRequestMessageBus}) {
    const args = {factoryContainerBindingName,serverResponseMessageBus,serverRequestMessageBus};
    const binding = ServerMessageBusFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createServerMessageBus };
