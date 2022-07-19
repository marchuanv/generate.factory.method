const { FactoryContainer } = require('./factory.container.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpServerMessageQueue } = require('C:\\component\\lib\\http\\httpservermessagequeue.js');
function createHttpServerMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,messageQueueArray,userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({recipientHost,recipientPort,messageQueueTypeCode,messageQueueArray,userId,senderHost,senderPort});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
factoryContainer.add(createMessageQueue({messageQueueTypeCode,messageQueueArray}));
factoryContainer.add(createRecipientAddress({recipientHost,recipientPort}));
    const httpServerMessageQueue = new HttpServerMessageQueue(factoryContainer);
    factoryContainer.add({httpServerMessageQueue});
    return factoryContainer;
}
module.exports = { createHttpServerMessageQueue };
