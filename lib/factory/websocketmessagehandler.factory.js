const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({}) {
    let container = factory.createContainer(WebSocketMessageHandler);
    container.add({});
    container.add(createWebSocketMessageQueue({}));
    const webSocketMessageHandler = new WebSocketMessageHandler(container);
    container.add({webSocketMessageHandler});
    return container;
}
module.exports = { createWebSocketMessageHandler };
