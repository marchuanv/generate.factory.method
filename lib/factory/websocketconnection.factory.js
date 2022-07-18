const { FactoryContainer } = require('./factory.container.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({timeout,hostAddress}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({timeout,hostAddress});
    factoryContainer.add(createWebSocketMessageQueue({}));
    const webSocketConnection = new WebSocketConnection(factoryContainer);
    factoryContainer.add({webSocketConnection});
    return factoryContainer;
}
module.exports = { createWebSocketConnection };
