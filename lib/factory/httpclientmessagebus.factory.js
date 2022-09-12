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
* @param {scopeId,timeout,messageQueue}
*/
function createHttpClientMessageBus({scopeId,timeout,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    container.config(getHttpClientMessageBusFactoryConfig());
    container.reference({timeout,messageQueue});
        container.reference(createHttpClientStopMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpClientStartedMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpClientStartMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpClientResponseMessageQueueBinding({scopeId,messageQueue}));
container.reference(createHttpClientRequestMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
