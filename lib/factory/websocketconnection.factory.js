const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
/**
* IsSingleton: false 
* Create WebSocketConnection 
* @param {timeout,hostAddress}
*/
function createWebSocketConnection({timeout,hostAddress}) {
    const container = factory.createContainer({ type: WebSocketConnection, variableName:'webSocketConnection', singleton: false });
    container.config({timeout,hostAddress});
    container.config(createWebSocketMessageQueue({}));
    container.initialise();
    return container.references;
}
module.exports = { createWebSocketConnection };
