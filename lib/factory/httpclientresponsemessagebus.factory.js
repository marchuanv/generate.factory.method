const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createMessageQueueBinder } = require('C:\\component\\lib\\factory\\messagequeuebinder.factory.js');
const { HttpClientResponseMessageBus } = require('C:\\component\\lib\\http\\httpclientresponsemessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientResponseMessageBus 
* @param {scopeId}
*/
function createHttpClientResponseMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: HttpClientResponseMessageBus, variableName:'httpClientResponseMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientResponseMessageBus, variableName:'httpClientResponseMessageBus', singleton: false });
        container.config({scopeId});
            container.config(createMessageQueueBinder({scopeId}));
container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientResponseMessageBus };
