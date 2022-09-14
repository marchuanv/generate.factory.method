const { Factory } = require('../factory.js');
const { HttpServerStoppedMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(HttpServerStoppedMessageQueueBindingFactoryContainer);

/**
* IsSingleton: HttpServerStoppedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStoppedMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerStoppedMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerStoppedMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerStoppedMessageQueueBinding };
