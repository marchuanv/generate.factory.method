const factory = require('./factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpConnection, variableName:'httpConnection' });
    container.config({timeout,recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.config(createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
    container.complete();
    return container;
}
module.exports = { createHttpConnection };
