const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({ host,port }) {
    return new WebSocketConnection({ host,port });
}
module.exports = { createWebSocketConnection };
