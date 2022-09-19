const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusManagerFactoryContainer.singleton
* Create HttpServerMessageBusManager
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerMessageBusManager({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpServerMessageBusManagerFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpServerMessageBusManager };
