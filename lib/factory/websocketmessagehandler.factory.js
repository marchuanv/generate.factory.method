const { WebSocketMessageHandler } = require('C:\\component\\lib\\websocket\\websocketmessagehandler.js');
function createWebSocketMessageHandler({timeout,hostAddress}) {

    return new WebSocketMessageHandler({websocketConnection,websocketMessageQueue});
}
module.exports = { createWebSocketMessageHandler };
