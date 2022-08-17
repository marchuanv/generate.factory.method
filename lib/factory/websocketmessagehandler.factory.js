const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('D:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('D:\\component\\lib\\websocket\\websocketmessagehandler.js');
/**
* Create WebSocketMessageHandler
* @param {}
*/
function createWebSocketMessageHandler({}) {
    const container = factory.createContainer({ type: WebSocketMessageHandler, variableName:'webSocketMessageHandler', singleton: false });
    container.config({});
    container.config(createWebSocketMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createWebSocketMessageHandler };
