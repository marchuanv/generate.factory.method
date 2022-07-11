const { FactoryContainer } = require('./factory.container.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({timeout,hostAddress}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add(createWebSocketMessageQueue({}));
    const websocketConnection = new WebSocketConnection({timeout,websocketMessageQueue,hostAddress});
    factoryContainer.add(websocketConnection);
    return factoryContainer;
}
module.exports = { createWebSocketConnection };
