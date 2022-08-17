const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('D:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('D:\\component\\lib\\websocket\\websocketconnection.js');
/**
* Create WebSocketConnection
* @param {timeout,hostAddress}
*/
function createWebSocketConnection({timeout,hostAddress}) {
    const container = factory.createContainer({ type: WebSocketConnection, variableName:'webSocketConnection', singleton: false });
    container.config({timeout,hostAddress});
    container.config(createWebSocketMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createWebSocketConnection };
