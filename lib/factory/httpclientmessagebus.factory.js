const factory = require('./factory.js');
const { createMessageQueueBinder } = require('C:\\component\\lib\\factory\\messagequeuebinder.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { HttpClientMessageBus } = require('C:\\component\\lib\\http\\httpclientmessagebus.js');
/**
* IsSingleton: false 
* Create HttpClientMessageBus 
* @param {scopeId,timeout}
*/
function createHttpClientMessageBus({scopeId,timeout}) {
    let container = factory.getContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpClientMessageBus, variableName:'httpClientMessageBus', singleton: false });
        container.config({scopeId,timeout});
            container.config(createMessageQueue({scopeId}));
container.config(createMessageQueueBinder({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpClientMessageBus };
