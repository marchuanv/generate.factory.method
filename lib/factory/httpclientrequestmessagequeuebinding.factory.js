const factory = require('../factory.js');
const { createMessageQueueBinding } = require('C:\\component\\lib\\factory\\messagequeuebinding.factory.js');
const { HttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientrequestmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientRequestMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientRequestMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientRequestMessageQueueBinding, variableName:'httpClientRequestMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientRequestMessageQueueBinding, variableName:'httpClientRequestMessageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientRequestMessageQueueBinding };
