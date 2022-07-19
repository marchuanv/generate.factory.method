const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({isSyncedMessageQueueTypes,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({isSyncedMessageQueueTypes,messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort});
    factoryContainer.add(createHttpClientMessageQueue({recipientHost,recipientPort,isSyncedMessageQueueTypes,messageQueueTypeCode,userId,senderHost,senderPort}));
factoryContainer.add(createHttpServerMessageQueue({recipientHost,recipientPort,isSyncedMessageQueueTypes,messageQueueTypeCode,userId,senderHost,senderPort}));
factoryContainer.add(createMessageQueue({isSyncedMessageQueueTypes,messageQueueTypeCode}));
    const httpMessageHandler = new HttpMessageHandler(factoryContainer);
    factoryContainer.add({httpMessageHandler});
    return factoryContainer;
}
module.exports = { createHttpMessageHandler };
