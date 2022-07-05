const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({ websocketConnection,websocketMessageQueue }) {
    return new WebSocketMessageHandler({ websocketConnection,websocketMessageQueue });
}
module.exports = { createWebSocketMessageHandler };
