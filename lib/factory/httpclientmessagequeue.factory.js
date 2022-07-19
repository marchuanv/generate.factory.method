const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpClientMessageQueue } = require('C:\\component\\lib\\http\\httpclientmessagequeue.js');
function createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpClientMessageQueue, variableName:'httpClientMessageQueue' });
    container.config({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageQueue({}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container;
}
module.exports = { createHttpClientMessageQueue };
