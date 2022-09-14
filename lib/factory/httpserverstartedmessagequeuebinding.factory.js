const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStartedMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.container.json');
const { HttpServerStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstartedmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpServerStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartedMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerStartedMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpServerStartedMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerStartedMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpServerStartedMessageQueueBinding };
