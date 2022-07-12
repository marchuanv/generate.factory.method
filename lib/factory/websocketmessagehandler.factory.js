const { FactoryContainer } = require('./factory.container.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({});
    factoryContainer.add(createWebSocketMessageQueue({}));
    const webSocketMessageHandler = new WebSocketMessageHandler(factoryContainer);
    factoryContainer.add({webSocketMessageHandler});
    return factoryContainer;
}
module.exports = { createWebSocketMessageHandler };
