const { FactoryContainer } = require('./factory.container.js');

const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function createWebSocketMessageQueue({}) {
    let factoryContainer = new FactoryContainer();
    
    const websocketMessageQueue = new WebSocketMessageQueue({});
    factoryContainer.add(websocketMessageQueue);
    return factoryContainer;
}
module.exports = { createWebSocketMessageQueue };
