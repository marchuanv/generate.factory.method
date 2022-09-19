const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientRequestMessageBusFactoryContainer.singleton
* Create HttpClientRequestMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientRequestMessageBus({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = HttpClientRequestMessageBusFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createHttpClientRequestMessageBus };
