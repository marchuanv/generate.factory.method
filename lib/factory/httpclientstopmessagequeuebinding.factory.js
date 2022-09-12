const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstopmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpClientStopMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStopMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStopMessageQueueBinding, variableName:'httpClientStopMessageQueueBinding', singleton: true });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStopMessageQueueBinding };
