const { Factory } = require('../factory.js');
const factory = new Factory();

const { ClientMessageBus } = require('C:\\component\\lib\\clientmessagebus.prototype.js');
const { ClientMessageBusCtorParamConfig } = require('C:\\component\\lib\\factory\\clientmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create ClientMessageBus 
* @param {scopeId,messageConverter,httpClientRequestMessageBus,httpClientResponseMessageBus,webSocketClientRequestMessagebus,webSocketClientResponseMessageBus}
*/
function createClientMessageBus({scopeId,messageConverter,httpClientRequestMessageBus,httpClientResponseMessageBus,webSocketClientRequestMessagebus,webSocketClientResponseMessageBus}) {
    const container = factory.getContainer({ scopeId, type: ClientMessageBus, variableName:'clientMessageBus', singleton: false });
    container.config(new ClientMessageBusCtorParamConfig());
    container.reference({messageConverter,httpClientRequestMessageBus,httpClientResponseMessageBus,webSocketClientRequestMessagebus,webSocketClientResponseMessageBus});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createClientMessageBus };
