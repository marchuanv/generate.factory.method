const { FactoryContainer } = require('./factory.container.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,recipientHost,recipientPort,messageQueueTypeCode,messageQueueArray,userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({timeout,recipientHost,recipientPort,messageQueueTypeCode,messageQueueArray,userId,senderHost,senderPort});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
factoryContainer.add(createHttpServerMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,messageQueueArray,userId,senderHost,senderPort}));
factoryContainer.add(createHttpClientMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,messageQueueArray,userId,senderHost,senderPort}));
    const httpConnection = new HttpConnection(factoryContainer);
    factoryContainer.add({httpConnection});
    return factoryContainer;
}
module.exports = { createHttpConnection };
