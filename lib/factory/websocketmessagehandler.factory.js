const { FactoryContainer } = require('./factory.container.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({timeout,hostAddress}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add(createWebSocketMessageQueue({}));
factoryContainer.add(createWebSocketConnection({timeout,hostAddress}));
    const webSocketMessageHandler = new WebSocketMessageHandler({websocketConnection,websocketMessageQueue});
    factoryContainer.add(webSocketMessageHandler);
    return factoryContainer;
}
module.exports = { createWebSocketMessageHandler };
