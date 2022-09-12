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
* @param {scopeId,messageQueue}
*/
function createHttpClientMessageBusManager({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientMessageBusManager, variableName:'httpClientMessageBusManager', singleton: false });
    container.config(getHttpClientMessageBusManagerFactoryConfig());
    container.reference({messageQueue});
        container.reference(createHttpClientStartedMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpClientStartMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpClientStopMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBusManager };
