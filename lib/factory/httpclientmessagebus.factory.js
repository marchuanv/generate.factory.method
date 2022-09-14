const { Factory } = require('../factory.js');
const { HttpClientMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.container.json');
const factory = new Factory(HttpClientMessageBusFactoryContainer);

/**
* IsSingleton: HttpClientMessageBusFactoryContainer.singleton
* Create HttpClientMessageBus
* @param {scopeId,timeout}
*/
function createHttpClientMessageBus({scopeId,timeout}) {
    const args = {scopeId,timeout};
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
