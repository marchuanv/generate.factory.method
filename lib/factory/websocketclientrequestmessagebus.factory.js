const factory = require('../factory.js');
const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.js');
const { WebSocketClientRequestMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagebus.js');
/**
* IsSingleton: false 
* Create WebSocketClientRequestMessageBus 
* @param {scopeId}
*/
function createWebSocketClientRequestMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: WebSocketClientRequestMessageBus, variableName:'webSocketClientRequestMessagebus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: WebSocketClientRequestMessageBus, variableName:'webSocketClientRequestMessagebus', singleton: false });
        container.config({});
            container.config(createWebSocketClientRequestMessageQueueBinding({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientRequestMessageBus };
