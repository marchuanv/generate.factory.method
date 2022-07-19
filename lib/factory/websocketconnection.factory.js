const factory = require('./factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({timeout,hostAddress}) {
    let container = factory.createContainer(WebSocketConnection);
    container.add({timeout,hostAddress});
    container.add(createWebSocketMessageQueue({}));
    const webSocketConnection = new WebSocketConnection(container);
    container.add({webSocketConnection});
    return container;
}
module.exports = { createWebSocketConnection };
