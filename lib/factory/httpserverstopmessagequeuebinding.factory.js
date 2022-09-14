const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpServerStopMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.container.json');
const { HttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstopmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpServerStopMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStopMessageQueueBinding
* @param {scopeId}
*/
function createHttpServerStopMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerStopMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpServerStopMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpServerStopMessageQueueBinding };
