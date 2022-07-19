const factory = require('./factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({token,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageHandler, variableName:'messageHandler', singleton: false });
    container.config({token,recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageQueue({}));
container.config(createWebSocketMessageHandler({}));
container.config(createHttpMessageHandler({recipientHost,recipientPort,userId,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageHandler };
