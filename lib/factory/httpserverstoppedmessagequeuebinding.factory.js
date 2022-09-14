const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStoppedMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.container.json');
const { HttpServerStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstoppedmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpServerStoppedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStoppedMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerStoppedMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpServerStoppedMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerStoppedMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
