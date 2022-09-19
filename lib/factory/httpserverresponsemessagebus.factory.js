const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerResponseMessageBusFactoryContainer.singleton
* Create HttpServerResponseMessageBus
* @param {scopeId}
*/
function createHttpServerResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerResponseMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerResponseMessageBus };
