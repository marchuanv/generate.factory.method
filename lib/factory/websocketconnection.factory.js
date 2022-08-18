const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
/**
* IsSingleton: false 
* Create WebSocketConnection 
* @param {scopeId,timeout,hostAddress}
*/
function createWebSocketConnection({scopeId,timeout,hostAddress}) {
    let container = factory.getContainer({ scopeId, type: WebSocketConnection, variableName:'webSocketConnection' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: WebSocketConnection, variableName:'webSocketConnection', singleton: false });
        container.config({scopeId,timeout,hostAddress});
            container.config(createWebSocketMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketConnection };
