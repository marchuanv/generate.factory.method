const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStartedMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.container.json');
const { HttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartedmessagequeuebinding.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientStartedMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpClientStartedMessageQueueBinding };
