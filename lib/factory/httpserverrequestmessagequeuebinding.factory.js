const { Factory } = require('../factory.js');
const { HttpServerRequestMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(HttpServerRequestMessageQueueBindingFactoryContainer);

/**
* IsSingleton: HttpServerRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpServerRequestMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerRequestMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerRequestMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerRequestMessageQueueBinding };
