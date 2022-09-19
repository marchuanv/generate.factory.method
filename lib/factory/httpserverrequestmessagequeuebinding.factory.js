const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpServerRequestMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerRequestMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpServerRequestMessageQueueBindingFactoryContainer.bindings[factoryContainerBindingName];
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
module.exports = { createHttpServerRequestMessageQueueBinding };
