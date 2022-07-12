const { FactoryContainer } = require('./factory.container.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({timeout,host,port}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({timeout,host,port});
    factoryContainer.add(createWebSocketMessageQueue({}));
factoryContainer.add(createWebSocketConnection({timeout,host,port}));
    const webSocketMessageHandler = new WebSocketMessageHandler(factoryContainer);
    factoryContainer.add({webSocketMessageHandler});
    return factoryContainer;
}
module.exports = { createWebSocketMessageHandler };
