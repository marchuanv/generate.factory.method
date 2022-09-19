const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusManagerFactoryContainer.singleton
* Create HttpServerMessageBusManager
* @param {scopeId}
*/
function createHttpServerMessageBusManager({scopeId}) {
    const args = {scopeId};
    const binding = HttpServerMessageBusManagerFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpServerMessageBusManager };
