const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstopmessagequeuebinding.js');
/**
* IsSingleton: true 
* Create HttpClientStopMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStopMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStopMessageQueueBinding, variableName:'httpClientStopMessageQueueBinding', singleton: true });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientStopMessageQueueBinding, variableName:'httpClientStopMessageQueueBinding', singleton: true });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStopMessageQueueBinding };
