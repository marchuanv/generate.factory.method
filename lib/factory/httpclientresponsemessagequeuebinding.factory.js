const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientResponseMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientresponsemessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientResponseMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientResponseMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientResponseMessageQueueBinding, variableName:'httpClientResponseMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientResponseMessageQueueBinding, variableName:'httpClientResponseMessageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientResponseMessageQueueBinding };
