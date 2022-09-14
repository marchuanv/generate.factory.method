const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerRequestMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverrequestmessagequeuebinding.container.json');
const { HttpServerRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverrequestmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpServerRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpServerRequestMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerRequestMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpServerRequestMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerRequestMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpServerRequestMessageQueueBinding };
