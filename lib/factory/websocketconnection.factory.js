const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({ websocketMessageQueuehostAddress,timeout,websocketMessageQueue,hostAddress }) {
    return new WebSocketConnection({ websocketMessageQueuehostAddress,timeout,websocketMessageQueue,hostAddress });
}
module.exports = { createWebSocketConnection };
