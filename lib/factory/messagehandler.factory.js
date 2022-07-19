const factory = require('./factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
/**
* Create MessageHandler
* @param {token,messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort}
*/
function createMessageHandler({token,messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: MessageHandler, variableName:'messageHandler', singleton: false });
    container.config({token,messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createSharedMessageQueue({messageQueueTypeArray}));
container.config(createWebSocketMessageHandler({}));
container.config(createHttpMessageHandler({messageQueueTypeArray,recipientHost,recipientPort,userId,senderHost,senderPort}));
    container.complete();
    return container.references;
}
module.exports = { createMessageHandler };
