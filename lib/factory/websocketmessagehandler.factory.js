const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({timeout,hostAddress}) {
    const {websocketMessageQueue} = createWebSocketMessageQueue({});
const {websocketConnection} = createWebSocketConnection({timeout,hostAddress});
    const webSocketMessageHandler = new WebSocketMessageHandler({websocketConnection,websocketMessageQueue});
    return {websocketConnection,websocketMessageQueue,webSocketMessageHandler};
}
module.exports = { createWebSocketMessageHandler };
