const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
const { HttpClientMessageBusManager } = require('C:\\component\\lib\\http\\httpclientmessagebusmanager.prototype.js');
const getHttpClientMessageBusManagerFactoryConfig = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBusManager 
* @param {scopeId}
*/
function createHttpClientMessageBusManager({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpClientMessageBusManager, variableName:'httpClientMessageBusManager', singleton: false });
    container.config(getHttpClientMessageBusManagerFactoryConfig());
    container.reference({});
        container.reference(createHttpClientStartedMessageQueueBinding({scopeId}));
container.reference(createHttpClientStartMessageQueueBinding({scopeId}));
container.reference(createHttpClientStopMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBusManager };
