const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({ websocketMessageQueue,hostAddress,timeout }) {
    return new WebSocketConnection({ websocketMessageQueue,hostAddress,timeout });
}
module.exports = { createWebSocketConnection };
