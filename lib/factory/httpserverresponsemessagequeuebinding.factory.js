const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpServerResponseMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerResponseMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerResponseMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerResponseMessageQueueBinding };
