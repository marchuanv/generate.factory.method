const factory = require('./factory.js');
const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
/**
* Create HttpMessageHandler
* @param {messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort}
*/
function createHttpMessageHandler({messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpMessageHandler, variableName:'httpMessageHandler', singleton: false });
    container.config({messageQueueTypeCode,recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createHttpClientMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort}));
container.config(createHttpServerMessageQueue({recipientHost,recipientPort,messageQueueTypeCode,userId,senderHost,senderPort}));
container.config(createMessageHandlerQueue({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageHandler };
