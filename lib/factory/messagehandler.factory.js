const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({timeout,hostAddress}) {
    const websocketMessageQueue = createWebSocketMessageQueue({});
const websocketConnection = createWebSocketConnection({timeout,websocketMessageQueue,hostAddress});
const webSocketMessageHandler = createWebSocketMessageHandler({websocketConnection,websocketMessageQueue});
const httpMessageQueue = createHttpMessageQueue({});
const httpConnection = createHttpConnection({timeout,httpMessageQueue,hostAddress});
const httpMessageHandler = createHttpMessageHandler({httpConnection,httpMessageQueue});
    return new MessageHandler({httpMessageHandler,webSocketMessageHandler});
}
module.exports = { createMessageHandler };