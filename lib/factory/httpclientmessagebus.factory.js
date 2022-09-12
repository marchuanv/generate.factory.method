const { Factory } = require('../factory.js');
const factory = new Factory();

const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.prototype.js');
const { HttpClientMessageBusCtorParamConfig } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {scopeId,timeout,httpClientRequestMessageQueueBinding,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding,httpClientStoppedMessageQueueBinding}
*/
function createHttpClientMessageBus({scopeId,timeout,httpClientRequestMessageQueueBinding,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding,httpClientStoppedMessageQueueBinding}) {
    const container = factory.getContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config(new HttpClientMessageBusCtorParamConfig());
    container.reference({timeout,httpClientRequestMessageQueueBinding,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding,httpClientStoppedMessageQueueBinding});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
