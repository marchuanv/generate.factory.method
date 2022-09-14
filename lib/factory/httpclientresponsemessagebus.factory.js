const { Factory } = require('../factory.js');
const { HttpClientResponseMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.container.json');
const factory = new Factory(HttpClientResponseMessageBusFactoryContainer);

/**
* IsSingleton: HttpClientResponseMessageBusFactoryContainer.singleton
* Create HttpClientResponseMessageBus
* @param {scopeId}
*/
function createHttpClientResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientResponseMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientResponseMessageBus };
