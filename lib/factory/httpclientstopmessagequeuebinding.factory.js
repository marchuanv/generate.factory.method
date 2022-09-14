const { Factory } = require('../factory.js');
const { HttpClientStopMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.container.json');
const { HttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstopmessagequeuebinding.prototype.js');
const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');

const factory = new Factory(HttpClientStopMessageQueueBindingFactoryContainer);

/**
* IsSingleton: HttpClientStopMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStopMessageQueueBinding
* @param {scopeId}
*/
function createHttpClientStopMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientStopMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createHttpClientStopMessageQueueBinding };
