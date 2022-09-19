const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusFactoryContainer.singleton
* Create HttpServerMessageBus
* @param {factoryContainerBindingName,timeout,scopeId,senderHost,senderPort}
*/
function createHttpServerMessageBus({factoryContainerBindingName,timeout,scopeId,senderHost,senderPort}) {
    const args = {factoryContainerBindingName,timeout,scopeId,senderHost,senderPort};
    const binding = HttpServerMessageBusFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpServerMessageBus };
