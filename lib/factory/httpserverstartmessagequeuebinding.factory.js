const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverstartmessagequeuebinding.container.json');
const { HttpServerStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpServerStartMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerStartMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerStartMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerStartMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpServerStartMessageQueueBinding };
