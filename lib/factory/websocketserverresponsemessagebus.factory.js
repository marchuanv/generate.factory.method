const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.js');
const { WebSocketServerResponseMessageBus } = require('C:\\component\\lib\\websocket\\websocketserverresponsemessagebus.prototype.js');
const getWebSocketServerResponseMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketServerResponseMessageBus 
* @param {scopeId}
*/
function createWebSocketServerResponseMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketServerResponseMessageBus, variableName:'webSocketServerResponseMessageBus', singleton: false });
    container.config(getWebSocketServerResponseMessageBusFactoryConfig());
    container.reference({});
        container.reference(createWebSocketServerResponseMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketServerResponseMessageBus };
