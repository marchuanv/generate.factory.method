const { FactoryContainer } = require('./factory.container.js');

const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function createWebSocketMessageQueue({}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({});
    
    const websocketMessageQueue = new WebSocketMessageQueue(factoryContainer);
    factoryContainer.add({websocketMessageQueue});
    return factoryContainer;
}
module.exports = { createWebSocketMessageQueue };
