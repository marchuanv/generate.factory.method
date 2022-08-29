const factory = require('../factory.js');
const { createMessageQueueBinding } = require('C:\\component\\lib\\factory\\messagequeuebinding.factory.js');
const { HttpClientStopMessageQueueBinding } = require('C:\\component\\lib\\http\\httpclientstopmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create HttpClientStopMessageQueueBinding 
* @param {scopeId}
*/
function createHttpClientStopMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientStopMessageQueueBinding, variableName:'httpClientStopMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientStopMessageQueueBinding, variableName:'httpClientStopMessageQueueBinding', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientStopMessageQueueBinding };
