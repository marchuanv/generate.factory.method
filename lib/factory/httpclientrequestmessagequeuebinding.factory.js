const { Factory } = require('../factory.js');
const { HttpClientRequestMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.container.json');
const { HttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientrequestmessagequeuebinding.prototype.js');
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');

const factory = new Factory(HttpClientRequestMessageQueueBindingFactoryContainer);

/**
* IsSingleton: HttpClientRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpClientRequestMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientRequestMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientRequestMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientRequestMessageQueueBinding };
