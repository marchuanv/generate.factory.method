const { FactoryContainer } = require('./factory.container.js');

const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function createWebSocketMessageQueue({}) {
    let container = new FactoryContainer();
    container.add({});
    
    const websocketMessageQueue = new WebSocketMessageQueue(container);
    container.add({websocketMessageQueue});
    return container;
}
module.exports = { createWebSocketMessageQueue };
