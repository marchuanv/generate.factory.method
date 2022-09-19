const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStartMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerStartMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpServerStartMessageQueueBindingFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpServerStartMessageQueueBinding };
