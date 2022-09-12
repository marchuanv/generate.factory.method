const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.js');
const { WebSocketClientResponseMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagebus.js');
/**
* IsSingleton: false 
* Create WebSocketClientResponseMessageBus 
* @param {scopeId}
*/
function createWebSocketClientResponseMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: WebSocketClientResponseMessageBus, variableName:'webSocketClientResponseMessageBus', singleton: false });
    container.config({});
    container.config(createWebSocketClientResponseMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientResponseMessageBus };
