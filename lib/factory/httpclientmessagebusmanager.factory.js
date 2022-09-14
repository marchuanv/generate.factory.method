const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
const { HttpClientMessageBusManagerFactoryContainer } = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.container.json');
const { HttpClientMessageBusManager } = require('C:\\component\\lib\\http\\httpclientmessagebusmanager.prototype.js');

/**
* IsSingleton: HttpClientMessageBusManagerFactoryContainer.singleton
* Create HttpClientMessageBusManager
* @param {scopeId}
*/
function createHttpClientMessageBusManager({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = HttpClientMessageBusManagerFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, HttpClientMessageBusManagerFactoryContainer);
}
module.exports = { createHttpClientMessageBusManager };
