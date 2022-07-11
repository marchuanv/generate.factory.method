const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({timeout,userId,hostAddress}) {
    const {webSocketMessageHandler} = createWebSocketMessageHandler({timeout,hostAddress});
const {httpMessageHandler} = createHttpMessageHandler({timeout,userId,hostAddress});
    const messageHandler = new MessageHandler({httpMessageHandler,webSocketMessageHandler});
    return {httpMessageHandler,webSocketMessageHandler,messageHandler};
}
module.exports = { createMessageHandler };
