const factory = require('../factory.js');

const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
/**
* IsSingleton: false 
* Create WebSocketMessageQueue 
* @param {scopeId}
*/
function createWebSocketMessageQueue({scopeId}) {
    let container = factory.getContainer({ scopeId, type: WebSocketMessageQueue, variableName:'websocketMessageQueue', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: WebSocketMessageQueue, variableName:'websocketMessageQueue', singleton: false });
        container.config({});
            
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketMessageQueue };
