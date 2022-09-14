const { Factory } = require('../factory.js');
const { HttpClientStartMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.container.json');
const { HttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartmessagequeuebinding.prototype.js');
const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');

const factory = new Factory(HttpClientStartMessageQueueBindingFactoryContainer);

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
