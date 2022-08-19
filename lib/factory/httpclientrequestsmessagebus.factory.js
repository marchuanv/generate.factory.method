const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientRequestsMessageBus } = require('C:\\component\\lib\\http\\httpclientrequestsmessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientRequestsMessageBus 
* @param {scopeId}
*/
function createHttpClientRequestsMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientRequestsMessageBus, variableName:'httpClientRequestsMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientRequestsMessageBus, variableName:'httpClientRequestsMessageBus', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientRequestsMessageBus };
