const { FactoryContainer } = require('./factory.container.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({token,messageQueueTypeCode,isSyncedMessageQueueTypes,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({token,messageQueueTypeCode,isSyncedMessageQueueTypes,recipientHost,recipientPort,userId,senderHost,senderPort});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
factoryContainer.add(createMessageQueue({messageQueueTypeCode,isSyncedMessageQueueTypes}));
factoryContainer.add(createWebSocketMessageHandler({}));
factoryContainer.add(createHttpMessageHandler({messageQueueTypeCode,isSyncedMessageQueueTypes,recipientHost,recipientPort,userId,senderHost,senderPort}));
    const messageHandler = new MessageHandler(factoryContainer);
    factoryContainer.add({messageHandler});
    return factoryContainer;
}
module.exports = { createMessageHandler };
