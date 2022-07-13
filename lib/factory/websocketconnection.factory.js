const { FactoryContainer } = require('./factory.container.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { createHostAddress } = require('C:\\component\\lib\\factory\\hostaddress.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({timeout,host,hostPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({timeout,host,hostPort});
    factoryContainer.add(createHostAddress({host,hostPort}));
factoryContainer.add(createWebSocketMessageQueue({}));
    const webSocketConnection = new WebSocketConnection(factoryContainer);
    factoryContainer.add({webSocketConnection});
    return factoryContainer;
}
module.exports = { createWebSocketConnection };
