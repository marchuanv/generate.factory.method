const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({timeout,hostAddress}) {
    const websocketMessageQueue = createWebSocketMessageQueue({});
const websocketConnection = createWebSocketConnection({timeout,websocketMessageQueue,hostAddress});
    return new WebSocketMessageHandler({websocketConnection,websocketMessageQueue});
}
module.exports = { createWebSocketMessageHandler };
