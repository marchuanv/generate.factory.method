const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
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
        container.config({scopeId});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientRequestMessageBus };
