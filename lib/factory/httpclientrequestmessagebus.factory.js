const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { HttpClientRequestMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.container.json');
const { HttpClientRequestMessageBus } = require('C:\\component\\lib\\http\\httpclientrequestmessagebus.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientRequestMessageBusFactoryContainer);
}
module.exports = { createHttpClientRequestMessageBus };
