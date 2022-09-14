const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerResponseMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverresponsemessagequeuebinding.container.json');
const { HttpServerResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverresponsemessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpServerResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpServerResponseMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerResponseMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerResponseMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerResponseMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpServerResponseMessageQueueBinding };
