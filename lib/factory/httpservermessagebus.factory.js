const { Factory } = require('../factory.js');
const { HttpServerMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.container.json');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.prototype.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');

const factory = new Factory(HttpServerMessageBusFactoryContainer);

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
