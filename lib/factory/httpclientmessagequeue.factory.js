const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpClientMessageQueue } = require('C:\\component\\lib\\http\\httpclientmessagequeue.js');
function createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let container = factory.createContainer(HttpClientMessageQueue);
    container.add({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.add(createSenderAddress({senderHost,senderPort}));
container.add(createMessageQueue({}));
container.add(createRecipientAddress({recipientHost,recipientPort}));
    const httpClientMessageQueue = new HttpClientMessageQueue(container);
    container.add({httpClientMessageQueue});
    return container;
}
module.exports = { createHttpClientMessageQueue };
