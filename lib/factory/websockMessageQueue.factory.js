
const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function createWebSocketMessageQueue({}) {
    
    const websocketMessageQueue = new WebSocketMessageQueue({});
    console.log('WebSocketMessageQueueFactory: --> created WebSocketMessageQueue');
    return {websocketMessageQueue};
}
module.exports = { createWebSocketMessageQueue };
