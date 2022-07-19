const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpServerMessageQueue } = require('C:\\component\\lib\\http\\httpservermessagequeue.js');
function createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpServerMessageQueue, variableName:'httpServerMessageQueue' });
    container.config({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageQueue({}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container;
}
module.exports = { createHttpServerMessageQueue };
