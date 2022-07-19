const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({messageQueueTypeCode,isSyncedMessageQueueTypes,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({messageQueueTypeCode,isSyncedMessageQueueTypes,recipientHost,recipientPort,userId,senderHost,senderPort});
    factoryContainer.add(createHttpClientMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,isSyncedMessageQueueTypes,userId,senderHost,senderPort}));
factoryContainer.add(createHttpServerMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,isSyncedMessageQueueTypes,userId,senderHost,senderPort}));
factoryContainer.add(createMessageQueue({messageQueueTypeCode,isSyncedMessageQueueTypes}));
    const httpMessageHandler = new HttpMessageHandler(factoryContainer);
    factoryContainer.add({httpMessageHandler});
    return factoryContainer;
}
module.exports = { createHttpMessageHandler };
