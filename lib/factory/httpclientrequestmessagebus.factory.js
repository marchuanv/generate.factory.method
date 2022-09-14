const { Factory } = require('../factory.js');
const { HttpClientRequestMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.container.json');
const { HttpClientRequestMessageBus } = require('C:\\component\\lib\\http\\httpclientrequestmessagebus.prototype.js');
const { createHttpClientRequestMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.js');

const factory = new Factory(HttpClientRequestMessageBusFactoryContainer);

/**
* IsSingleton: HttpClientRequestMessageBusFactoryContainer.singleton
* Create HttpClientRequestMessageBus
* @param {scopeId}
*/
function createHttpClientRequestMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = HttpClientRequestMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createHttpClientRequestMessageBus };
