const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartedmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpClientStartedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStartedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStartedMessageQueueBinding, variableName:'httpClientStartedMessageQueueBinding', singleton: true });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartedMessageQueueBinding };
