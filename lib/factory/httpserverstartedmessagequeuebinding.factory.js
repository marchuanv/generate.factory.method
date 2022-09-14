const { Factory } = require('../factory.js');
const { HttpServerStartedMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(HttpServerStartedMessageQueueBindingFactoryContainer);

/**
* IsSingleton: HttpServerStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartedMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerStartedMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerStartedMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerStartedMessageQueueBinding };
