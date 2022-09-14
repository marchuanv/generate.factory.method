const { Factory } = require('../factory.js');
const { HttpServerRequestMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.container.json');
const factory = new Factory(HttpServerRequestMessageBusFactoryContainer);

/**
* IsSingleton: HttpServerRequestMessageBusFactoryContainer.singleton
* Create HttpServerRequestMessageBus
* @param {scopeId}
*/
function createHttpServerRequestMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerRequestMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerRequestMessageBus };
