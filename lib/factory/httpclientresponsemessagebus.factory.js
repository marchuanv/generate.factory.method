const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
const { HttpClientResponseMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.container.json');
const { HttpClientResponseMessageBus } = require('C:\\component\\lib\\http\\httpclientresponsemessagebus.prototype.js');

/**
* IsSingleton: HttpClientResponseMessageBusFactoryContainer.singleton
* Create HttpClientResponseMessageBus
* @param {scopeId}
*/
function createHttpClientResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpClientResponseMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientResponseMessageBusFactoryContainer);
}
module.exports = { createHttpClientResponseMessageBus };
