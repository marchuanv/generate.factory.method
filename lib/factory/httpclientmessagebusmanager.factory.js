const { Factory } = require('../factory.js');
const { HttpClientMessageBusManagerFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.container.json');
const { HttpClientMessageBusManager } = require('C:\\component\\lib\\http\\httpclientmessagebusmanager.prototype.js');
const { createHttpClientMessageBusManager } = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.js');

const factory = new Factory(HttpClientMessageBusManagerFactoryContainer);

/**
* IsSingleton: HttpClientMessageBusManagerFactoryContainer.singleton
* Create HttpClientMessageBusManager
* @param {scopeId}
*/
function createHttpClientMessageBusManager({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientMessageBusManagerFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientMessageBusManager };
