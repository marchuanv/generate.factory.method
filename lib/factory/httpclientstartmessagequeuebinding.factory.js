const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStartMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientStartMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStartMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStartMessageQueueBinding, variableName:'httpClientStartMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientStartMessageQueueBinding, variableName:'httpClientStartMessageQueueBinding', singleton: false });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartMessageQueueBinding };
