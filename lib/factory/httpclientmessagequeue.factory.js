const { FactoryContainer } = require('./factory.container.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpClientMessageQueue } = require('C:\\component\\lib\\http\\httpclientmessagequeue.js');
function createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({recipientHost,recipientPort,userId,senderHost,senderPort});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
factoryContainer.add(createRecipientAddress({recipientHost,recipientPort}));
    const httpClientMessageQueue = new HttpClientMessageQueue(factoryContainer);
    factoryContainer.add({httpClientMessageQueue});
    return factoryContainer;
}
module.exports = { createHttpClientMessageQueue };