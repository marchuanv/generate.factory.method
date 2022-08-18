const factory = require('./factory.js');

const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
/**
* IsSingleton: false 
* Create WebSocketMessageQueue 
* @param {}
*/
function createWebSocketMessageQueue({}) {
    const container = factory.createContainer({ type: WebSocketMessageQueue, variableName:'websocketMessageQueue', singleton: false });
    container.config({});
    
    container.initialise();
    return container.references;
}
module.exports = { createWebSocketMessageQueue };
