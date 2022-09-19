const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusFactoryContainer.singleton
* Create HttpServerMessageBus
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}) {
    const args = {scopeId,timeout,senderHost,senderPort};
    const binding = HttpServerMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerMessageBus };
