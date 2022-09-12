const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.js');
const { HttpClientResponseMessageBus } = require('C:\\component\\lib\\http\\httpclientresponsemessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientResponseMessageBus 
* @param {scopeId}
*/
function createHttpClientResponseMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientResponseMessageBus, variableName:'httpClientResponseMessageBus', singleton: false });
    container.config({});
    container.config(createHttpClientResponseMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientResponseMessageBus };
