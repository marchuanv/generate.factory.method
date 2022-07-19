const factory = require('./factory.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({token,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let container = factory.createContainer(MessageHandler);
    container.add({token,recipientHost,recipientPort,userId,senderHost,senderPort});
    container.add(createSenderAddress({senderHost,senderPort}));
container.add(createMessageQueue({}));
container.add(createWebSocketMessageHandler({}));
container.add(createHttpMessageHandler({recipientHost,recipientPort,userId,senderHost,senderPort}));
    const messageHandler = new MessageHandler(container);
    container.add({messageHandler});
    return container;
}
module.exports = { createMessageHandler };
