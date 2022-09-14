const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.js');
const { WebSocketServerRequestMessageBus } = require('C:\\component\\lib\\websocket\\websocketserverrequestmessagebus.prototype.js');
const getWebSocketServerRequestMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketServerRequestMessageBus 
* @param {scopeId}
*/
function createWebSocketServerRequestMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketServerRequestMessageBus, variableName:'webSocketServerRequestMessageBus', singleton: false });
    container.config(getWebSocketServerRequestMessageBusFactoryConfig());
    container.reference({});
        container.reference(createWebSocketServerRequestMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketServerRequestMessageBus };
