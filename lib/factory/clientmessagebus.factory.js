const factory = require('../factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createHttpClientRequestMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.js');
const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.js');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {scopeId}
*/
function createClientMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
        container.config({scopeId});
            container.config(createHttpClientResponseMessageBus({scopeId}));
container.config(createHttpClientRequestMessageBus({scopeId}));
container.config(createMessageConverter({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createClientMessageBus };
