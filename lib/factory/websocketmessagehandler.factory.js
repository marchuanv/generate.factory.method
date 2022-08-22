const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
/**
* IsSingleton: false 
* Create WebSocketMessageHandler 
* @param {scopeId}
*/
function createWebSocketMessageHandler({scopeId}) {
    let container = factory.getContainer({ scopeId, type: WebSocketMessageHandler, variableName:'webSocketMessageHandler', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: WebSocketMessageHandler, variableName:'webSocketMessageHandler', singleton: false });
        container.config({scopeId});
            container.config(createWebSocketMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketMessageHandler };
