
const { WebSocketMessageQueue } = require('C:\\component\\lib\\websocket\\websockMessageQueue.js');
function createWebSocketMessageQueue({}) {
    
    const websocketMessageQueue = new WebSocketMessageQueue({});
    return {websocketMessageQueue};
}
module.exports = { createWebSocketMessageQueue };
