const factory = require('../factory.js');
const { createHttpClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.js');
const { HttpClientRequestMessageBus } = require('C:\\component\\lib\\http\\httpclientrequestmessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientRequestMessageBus 
* @param {scopeId}
*/
function createHttpClientRequestMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientRequestMessageBus, variableName:'httpClientRequestMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientRequestMessageBus, variableName:'httpClientRequestMessageBus', singleton: false });
        container.config({});
            container.config(createHttpClientRequestMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientRequestMessageBus };
