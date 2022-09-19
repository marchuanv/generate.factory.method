const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStartMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientStartMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpClientStartMessageQueueBindingFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpClientStartMessageQueueBinding };
