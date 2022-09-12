const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientMessageBusManager } = require('C:\\component\\lib\\http\\httpclientmessagebusmanager.prototype.js');
const getHttpClientMessageBusManagerFactoryConfig = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBusManager 
* @param {scopeId,httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding}
*/
function createHttpClientMessageBusManager({scopeId,httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding}) {
    const container = factory.getContainer({ scopeId, type: HttpClientMessageBusManager, variableName:'httpClientMessageBusManager', singleton: false });
    container.config(getHttpClientMessageBusManagerFactoryConfig());
    container.reference({httpClientStopMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBusManager };
