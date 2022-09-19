const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStoppedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStoppedMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientStoppedMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientStoppedMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientStoppedMessageQueueBinding };
