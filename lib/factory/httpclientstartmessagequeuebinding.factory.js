const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpClientStartMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStartMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStartMessageQueueBinding, variableName:'httpClientStartMessageQueueBinding', singleton: true });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartMessageQueueBinding };
