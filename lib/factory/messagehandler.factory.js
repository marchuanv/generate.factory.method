const { FactoryContainer } = require('./factory.container.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({token,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let container = new FactoryContainer();
    container.add({token,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort});
    container.add(createSenderAddress({senderHost,senderPort}));
container.add(createMessageQueue({messageQueueTypeCode}));
container.add(createWebSocketMessageHandler({}));
container.add(createHttpMessageHandler({messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort}));
    const messageHandler = new MessageHandler(container);
    container.add({messageHandler});
    return container;
}
module.exports = { createMessageHandler };
