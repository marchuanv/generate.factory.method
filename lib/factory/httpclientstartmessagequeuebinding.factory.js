const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStartMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientStartMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientStartMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientStartMessageQueueBinding };
