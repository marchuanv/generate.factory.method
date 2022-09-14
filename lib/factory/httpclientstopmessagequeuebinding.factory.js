const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStopMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.container.json');
const { HttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstopmessagequeuebinding.prototype.js');

/**
* IsSingleton: HttpClientStopMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStopMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientStopMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpClientStopMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientStopMessageQueueBindingFactoryContainer);
}
module.exports = { createHttpClientStopMessageQueueBinding };
