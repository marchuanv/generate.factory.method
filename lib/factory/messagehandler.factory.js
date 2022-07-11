const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({userId,timeout,hostAddress}) {
    const {webSocketMessageHandler} = createWebSocketMessageHandler({timeout,hostAddress});
const {httpMessageHandler} = createHttpMessageHandler({userId});
    const messageHandler = new MessageHandler({httpMessageHandler,webSocketMessageHandler});
    return {httpMessageHandler,webSocketMessageHandler,messageHandler};
}
module.exports = { createMessageHandler };
