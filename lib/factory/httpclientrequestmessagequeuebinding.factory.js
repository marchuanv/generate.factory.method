const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientRequestMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.container.json');
const { HttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientrequestmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpClientRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpClientRequestMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientRequestMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpClientRequestMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientRequestMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpClientRequestMessageQueueBinding };
