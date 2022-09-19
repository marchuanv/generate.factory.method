const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpServerResponseMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerResponseMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpServerResponseMessageQueueBindingFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpServerResponseMessageQueueBinding };
