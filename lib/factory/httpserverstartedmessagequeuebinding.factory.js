const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartedMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerStartedMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpServerStartedMessageQueueBindingFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpServerStartedMessageQueueBinding };
