const { FactoryContainer } = require('./factory.container.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort}) {
    let container = new FactoryContainer();
    container.add({timeout,recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort});
    container.add(createSenderAddress({senderHost,senderPort}));
container.add(createHttpServerMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort}));
container.add(createHttpClientMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort}));
    const httpConnection = new HttpConnection(container);
    container.add({httpConnection});
    return container;
}
module.exports = { createHttpConnection };
