const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientresponsemessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientResponseMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientResponseMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientResponseMessageQueueBinding, variableName:'httpClientResponseMessageQueueBinding', singleton: false });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientResponseMessageQueueBinding };
