const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketConnection } = require('C:\\component\\lib\\websocket\\websocketconnection.js');
function createWebSocketConnection({timeout,hostAddress}) {
    const websocketMessageQueue = createWebSocketMessageQueue({});
    return new WebSocketConnection({timeout,websocketMessageQueue,hostAddress});
}
module.exports = { createWebSocketConnection };
