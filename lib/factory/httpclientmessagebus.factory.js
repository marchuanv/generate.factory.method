const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
const { HttpClientMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientmessagebus.container.json');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.prototype.js');

/**
* IsSingleton: HttpClientMessageBusFactoryContainer.singleton
* Create HttpClientMessageBus
* @param {scopeId,timeout}
*/
function createHttpClientMessageBus({scopeId,timeout}) {
    const args = {scopeId,timeout};
    const { scopeId } = args;
    const binding = HttpClientMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientMessageBusFactoryContainer);
}
module.exports = { createHttpClientMessageBus };
