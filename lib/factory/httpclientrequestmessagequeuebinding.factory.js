const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientrequestmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientRequestMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientRequestMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientRequestMessageQueueBinding, variableName:'httpClientRequestMessageQueueBinding', singleton: false });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientRequestMessageQueueBinding };
