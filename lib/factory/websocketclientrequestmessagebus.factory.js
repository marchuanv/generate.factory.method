const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.js');
const { WebSocketClientRequestMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagebus.prototype.js');
const getWebSocketClientRequestMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketClientRequestMessageBus 
* @param {scopeId}
*/
function createWebSocketClientRequestMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketClientRequestMessageBus, variableName:'webSocketClientRequestMessagebus', singleton: false });
    container.config(getWebSocketClientRequestMessageBusFactoryConfig());
    container.reference({});
        container.reference(createWebSocketClientRequestMessageQueueBinding({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientRequestMessageBus };
