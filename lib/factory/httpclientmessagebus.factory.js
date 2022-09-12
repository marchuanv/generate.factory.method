const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
const { createHttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.js');
const { createHttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.js');
const { createHttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.prototype.js');
const getHttpClientMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {scopeId,timeout}
*/
function createHttpClientMessageBus({scopeId,timeout}) {
    const container = factory.getContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config(getHttpClientMessageBusFactoryConfig());
    container.reference({timeout});
        container.reference(createHttpClientStopMessageQueueBinding({scopeId}));
container.reference(createHttpClientStartedMessageQueueBinding({scopeId}));
container.reference(createHttpClientStartMessageQueueBinding({scopeId}));
container.reference(createHttpClientResponseMessageQueueBinding({scopeId}));
container.reference(createHttpClientRequestMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
