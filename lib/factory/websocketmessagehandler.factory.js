const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
/**
* IsSingleton: false
* Create WebSocketMessageHandler
* @param {}
*/
function createWebSocketMessageHandler({}) {
    const container = factory.createContainer({ type: WebSocketMessageHandler, variableName:'webSocketMessageHandler', singleton: false });
    container.config({});
    container.config(createWebSocketMessageQueue({}));
    container.initialise();
    return container.references;
}
module.exports = { createWebSocketMessageHandler };
