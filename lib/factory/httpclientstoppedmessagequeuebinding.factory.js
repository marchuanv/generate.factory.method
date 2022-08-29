const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStoppedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstoppedmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientStoppedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStoppedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStoppedMessageQueueBinding, variableName:'httpClientStoppedMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientStoppedMessageQueueBinding, variableName:'httpClientStoppedMessageQueueBinding', singleton: false });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
