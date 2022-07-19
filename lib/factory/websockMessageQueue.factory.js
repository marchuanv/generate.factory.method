const factory = require('./factory.js');

const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function createWebSocketMessageQueue({}) {
    let container = factory.createContainer(WebSocketMessageQueue);
    container.add({});
    
    const websocketMessageQueue = new WebSocketMessageQueue(container);
    container.add({websocketMessageQueue});
    return container;
}
module.exports = { createWebSocketMessageQueue };
