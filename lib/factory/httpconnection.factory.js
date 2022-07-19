const factory = require('./factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let container = factory.createContainer(HttpConnection);
    container.add({timeout,recipientHost,recipientPort,userId,senderHost,senderPort});
    container.add(createSenderAddress({senderHost,senderPort}));
container.add(createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.add(createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
    const httpConnection = new HttpConnection(container);
    container.add({httpConnection});
    return container;
}
module.exports = { createHttpConnection };
