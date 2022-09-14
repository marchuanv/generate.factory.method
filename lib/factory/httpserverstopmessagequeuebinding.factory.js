const { Factory } = require('../factory.js');
const { HttpServerStopMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.container.json');
const { HttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpserverstopmessagequeuebinding.prototype.js');
const { createHttpServerStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpserverstopmessagequeuebinding.factory.js');

const factory = new Factory(HttpServerStopMessageQueueBindingFactoryContainer);

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
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createHttpServerStopMessageQueueBinding };
