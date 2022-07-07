const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({timeout,hostAddress}) {
    const webSocketMessageHandler = createWebSocketMessageHandler({timeout,hostAddress});
const httpMessageHandler = createHttpMessageHandler({timeout,hostAddress});
    return new MessageHandler({httpMessageHandler,webSocketMessageHandler});
}
module.exports = { createMessageHandler };
