const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.js');
const { WebSocketClientRequestMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagebus.prototype.js');
const getWebSocketClientRequestMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketClientRequestMessageBus 
* @param {scopeId,messageQueue}
*/
function createWebSocketClientRequestMessageBus({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: WebSocketClientRequestMessageBus, variableName:'webSocketClientRequestMessagebus', singleton: false });
    container.config(getWebSocketClientRequestMessageBusFactoryConfig());
    container.reference({messageQueue});
        container.reference(createWebSocketClientRequestMessageQueueBinding({scopeId,messageQueue}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientRequestMessageBus };
