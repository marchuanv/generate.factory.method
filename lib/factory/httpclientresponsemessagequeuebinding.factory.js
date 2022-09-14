const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientResponseMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.container.json');
const { HttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientresponsemessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpClientResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpClientResponseMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientResponseMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpClientResponseMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientResponseMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpClientResponseMessageQueueBinding };
