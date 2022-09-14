const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStoppedMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.container.json');
const { HttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstoppedmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpClientStoppedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStoppedMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientStoppedMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpClientStoppedMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientStoppedMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
