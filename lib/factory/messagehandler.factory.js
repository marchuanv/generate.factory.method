const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({timeout,hostAddress}) {
    const {webSocketMessageHandler} = createWebSocketMessageHandler({timeout,hostAddress});
const {httpMessageHandler} = createHttpMessageHandler({timeout,hostAddress});
    const messageHandler = new MessageHandler({httpMessageHandler,webSocketMessageHandler});
    console.log('MessageHandlerFactory: --> created MessageHandler');
    return {httpMessageHandler,webSocketMessageHandler,messageHandler};
}
module.exports = { createMessageHandler };
