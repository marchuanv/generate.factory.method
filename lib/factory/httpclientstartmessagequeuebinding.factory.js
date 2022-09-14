const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStartMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.container.json');
const { HttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpClientStartMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientStartMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpClientStartMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientStartMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpClientStartMessageQueueBinding };
