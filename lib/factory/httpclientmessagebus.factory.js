const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientMessageBusFactoryContainer.singleton
* Create HttpClientMessageBus
* @param {timeout,scopeId}
*/
function createHttpClientMessageBus({timeout,scopeId}) {
    const args = {timeout,scopeId};
    const binding = HttpClientMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientMessageBus };
