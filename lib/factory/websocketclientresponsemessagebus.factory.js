const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.js');
const { WebSocketClientResponseMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagebus.prototype.js');
const getWebSocketClientResponseMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketClientResponseMessageBus 
* @param {scopeId}
*/
function createWebSocketClientResponseMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketClientResponseMessageBus, variableName:'webSocketClientResponseMessageBus', singleton: false });
    container.config(getWebSocketClientResponseMessageBusFactoryConfig());
    container.reference({});
        container.reference(createWebSocketClientResponseMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientResponseMessageBus };
