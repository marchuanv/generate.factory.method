const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpServerMessageQueue } = require('C:\\component\\lib\\http\\httpservermessagequeue.js');
/**
* Create HttpServerMessageQueue
* @param {recipientHost,recipientPort,userId,senderHost,senderPort}
*/
function createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpServerMessageQueue, variableName:'httpServerMessageQueue', singleton: false });
    container.config({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createSharedMessageQueue({}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpServerMessageQueue };
