const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({timeout,hostAddress}) {
    const container = factory.createContainer({ type: WebSocketConnection, variableName:'webSocketConnection' });
    container.config({timeout,hostAddress});
    container.config(createWebSocketMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createWebSocketConnection };
