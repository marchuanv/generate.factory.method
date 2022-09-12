const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
const { HttpClientResponseMessageBus } = require('C:\\component\\lib\\http\\httpclientresponsemessagebus.prototype.js');
const getHttpClientResponseMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create HttpClientResponseMessageBus 
* @param {scopeId}
*/
function createHttpClientResponseMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: HttpClientResponseMessageBus, variableName:'httpClientResponseMessageBus', singleton: false });
    container.config(getHttpClientResponseMessageBusFactoryConfig());
    container.reference({});
        container.reference(createHttpClientResponseMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientResponseMessageBus };
