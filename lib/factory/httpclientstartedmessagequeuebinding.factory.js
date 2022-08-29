const factory = require('../factory.js');
const { createMessageQueueBinding } = require('C:\\component\\lib\\factory\\messagequeuebinding.factory.js');
const { HttpClientStartedMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstartedmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientStartedMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStartedMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStartedMessageQueueBinding, variableName:'httpClientStartedMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientStartedMessageQueueBinding, variableName:'httpClientStartedMessageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStartedMessageQueueBinding };
