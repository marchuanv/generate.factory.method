const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { HttpClientRequestMessageBus } = require('C:\\component\\lib\\http\\httpclientrequestmessagebus.prototype.js');
const getHttpClientRequestMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientRequestMessageBus 
* @param {scopeId,messageQueue}
*/
function createHttpClientRequestMessageBus({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: HttpClientRequestMessageBus, variableName:'httpClientRequestMessageBus', singleton: false });
    container.config(getHttpClientRequestMessageBusFactoryConfig());
    container.reference({messageQueue});
        container.reference(createHttpClientRequestMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientRequestMessageBus };
