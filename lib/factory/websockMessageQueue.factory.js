const factory = require('./factory.js');

const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function createWebSocketMessageQueue({}) {
    const container = factory.createContainer({ type: WebSocketMessageQueue, variableName:'websocketMessageQueue' });
    container.config({});
    
    container.complete();
    return container.references;
}
module.exports = { createWebSocketMessageQueue };
