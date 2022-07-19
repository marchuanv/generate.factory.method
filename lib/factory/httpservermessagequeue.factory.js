const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpServerMessageQueue } = require('C:\\component\\lib\\http\\httpservermessagequeue.js');
function createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let container = factory.createContainer(HttpServerMessageQueue);
    container.add({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.add(createSenderAddress({senderHost,senderPort}));
container.add(createMessageQueue({}));
container.add(createRecipientAddress({recipientHost,recipientPort}));
    const httpServerMessageQueue = new HttpServerMessageQueue(container);
    container.add({httpServerMessageQueue});
    return container;
}
module.exports = { createHttpServerMessageQueue };
