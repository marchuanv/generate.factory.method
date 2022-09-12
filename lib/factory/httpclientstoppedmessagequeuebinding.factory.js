const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstoppedmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpClientStoppedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStoppedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStoppedMessageQueueBinding, variableName:'httpClientStoppedMessageQueueBinding', singleton: true });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
