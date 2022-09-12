const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createHttpClientRequestMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.js');
const { createHttpClientResponseMessageBus } = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.js');
const { createWebSocketClientRequestMessageBus } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.factory.js');
const { createWebSocketClientResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.js');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.prototype.js');
const getClientMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\clientmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {scopeId}
*/
function createClientMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
    container.config(getClientMessageBusFactoryConfig());
    container.reference({});
        container.reference(createWebSocketClientResponseMessageBus({scopeId}));
container.reference(createWebSocketClientRequestMessageBus({scopeId}));
container.reference(createHttpClientResponseMessageBus({scopeId}));
container.reference(createHttpClientRequestMessageBus({scopeId}));
container.reference(createMessageConverter({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createClientMessageBus };
