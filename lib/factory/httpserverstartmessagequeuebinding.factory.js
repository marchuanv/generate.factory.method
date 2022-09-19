const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStartMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerStartMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerStartMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createHttpServerStartMessageQueueBinding };
