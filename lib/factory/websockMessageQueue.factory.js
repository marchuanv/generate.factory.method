const factory = require('./factory.js');

const { WebSocketMessageQueue } = require('D:\\component\\lib\\websocket\\websockMessageQueue.js');
/**
* Create WebSocketMessageQueue
* @param {}
*/
function createWebSocketMessageQueue({}) {
    const container = factory.createContainer({ type: WebSocketMessageQueue, variableName:'websocketMessageQueue', singleton: false });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createWebSocketMessageQueue };
