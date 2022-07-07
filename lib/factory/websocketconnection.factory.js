const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({ timeout,websocketMessageQueue,hostAddress }) {
    return new WebSocketConnection({ timeout,websocketMessageQueue,hostAddress });
}
module.exports = { createWebSocketConnection };
