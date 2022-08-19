const factory = require('./factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
const { createHttpClientRequestsMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestsmessagebus.factory.js');
const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.js');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {scopeId,timeout}
*/
function createClientMessageBus({scopeId,timeout}) {
    let container = factory.getContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
        container.config({scopeId,timeout});
            container.config(createHttpClientResponseMessageBus({scopeId}));
container.config(createHttpClientRequestsMessageBus({scopeId}));
container.config(createHttpClientMessageBus({scopeId,timeout}));
container.config(createMessageQueue({scopeId}));
container.config(createMessageConverter({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createClientMessageBus };
