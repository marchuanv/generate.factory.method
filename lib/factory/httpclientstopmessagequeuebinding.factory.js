const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStopMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStopMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientStopMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpClientStopMessageQueueBindingFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpClientStopMessageQueueBinding };
