const { FactoryContainer } = require('./factory.container.js');
const { createHttpMessageHandler } = require('C:\\component\\lib\\factory\\httpmessagehandler.factory.js');
const { createWebSocketMessageHandler } = require('C:\\component\\lib\\factory\\websocketmessagehandler.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageHandler } = require('C:\\component\\lib\\messagehandler.js');
function createMessageHandler({token,userId,senderHost,senderPort,recipientHost,recipientPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({token,userId,senderHost,senderPort,recipientHost,recipientPort});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
factoryContainer.add(createMessageQueue({userId}));
factoryContainer.add(createWebSocketMessageHandler({}));
factoryContainer.add(createHttpMessageHandler({userId,senderHost,senderPort,recipientHost,recipientPort}));
    const messageHandler = new MessageHandler(factoryContainer);
    factoryContainer.add({messageHandler});
    return factoryContainer;
}
module.exports = { createMessageHandler };
