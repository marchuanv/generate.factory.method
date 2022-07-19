const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({}) {
    const container = factory.createContainer({ type: WebSocketMessageHandler, variableName:'webSocketMessageHandler' });
    container.config({});
    container.config(createWebSocketMessageQueue({}));
    container.complete();
    return container;
}
module.exports = { createWebSocketMessageHandler };
