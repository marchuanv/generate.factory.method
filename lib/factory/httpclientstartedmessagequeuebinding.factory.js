const { Factory } = require('../factory.js');
const { HttpClientStartedMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.container.json');
const { HttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartedmessagequeuebinding.prototype.js');
const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');

const factory = new Factory(HttpClientStartedMessageQueueBindingFactoryContainer);

/**
* IsSingleton: HttpClientStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartedMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientStartedMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientStartedMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientStartedMessageQueueBinding };
