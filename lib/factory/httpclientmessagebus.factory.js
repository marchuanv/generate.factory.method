const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.prototype.js');
const getHttpClientMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {scopeId,timeout,messageQueue,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding}
*/
function createHttpClientMessageBus({scopeId,timeout,messageQueue,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding}) {
    const container = factory.getContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config(getHttpClientMessageBusFactoryConfig());
    container.reference({timeout,messageQueue,httpClientResponseMessageQueueBinding,httpClientStartMessageQueueBinding,httpClientStartedMessageQueueBinding,httpClientStopMessageQueueBinding});
        container.reference(createHttpClientRequestMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
