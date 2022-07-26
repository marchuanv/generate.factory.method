const factory = require('./factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientaddress.factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpClientMessageQueue } = require('C:\\component\\lib\\http\\httpclientmessagequeue.js');
/**
* Create HttpClientMessageQueue
* @param {recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort}
*/
function createHttpClientMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpClientMessageQueue, variableName:'httpClientMessageQueue', singleton: false });
    container.config({recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createMessageQueueType({messageQueueTypeCode}));
container.config(createSharedMessageConverter({}));
container.config(createSharedMessageQueue({}));
container.config(createRecipientAddress({recipientHost,recipientPort}));
    container.complete();
    return container.references;
}
module.exports = { createHttpClientMessageQueue };
