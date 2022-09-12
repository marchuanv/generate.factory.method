const { Factory } = require('../factory.js');
const factory = new Factory();
const { createHttpClientRequestMessageBus } = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.js');
const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.prototype.js');
const getClientMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\clientmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {scopeId,messageConverter,messageQueue,httpClientResponseMessageBus,webSocketClientRequestMessagebus,webSocketClientResponseMessageBus}
*/
function createClientMessageBus({scopeId,messageConverter,messageQueue,httpClientResponseMessageBus,webSocketClientRequestMessagebus,webSocketClientResponseMessageBus}) {
    const container = factory.getContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
    container.config(getClientMessageBusFactoryConfig());
    container.reference({messageConverter,messageQueue,httpClientResponseMessageBus,webSocketClientRequestMessagebus,webSocketClientResponseMessageBus});
        container.reference(createHttpClientRequestMessageBus({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createClientMessageBus };
