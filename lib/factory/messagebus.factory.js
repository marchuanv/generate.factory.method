const { createMessageHandler } = require('C:\\component\\lib\\factory\\messagehandler.factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createHttpConnection } = require('C:\\component\\lib\\factory\\httpconnection.factory.js');
const { createHttpMessageQueue } = require('C:\\component\\lib\\factory\\httpmessagequeue.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createWebSocketConnection } = require('C:\\component\\lib\\factory\\websocketconnection.factory.js');
const { createWebSocketMessageQueue } = require('C:\\component\\lib\\factory\\websockMessageQueue.factory.js');
const { MessageBus } = require('C:\\component\\lib\\messagebus.js');
function createMessageBus({timeout,hostAddress}) {
    const websocketMessageQueue = createWebSocketMessageQueue({});
const websocketConnection = createWebSocketConnection({timeout,hostAddress});
const webSocketMessageHandler = createWebSocketMessageHandler({timeout,hostAddress});
const httpMessageQueue = createHttpMessageQueue({});
const httpConnection = createHttpConnection({timeout,hostAddress});
const httpMessageHandler = createHttpMessageHandler({timeout,hostAddress});
const messageHandler = createMessageHandler({timeout,hostAddress});
    return new MessageBus({messageHandler});
}
module.exports = { createMessageBus };
