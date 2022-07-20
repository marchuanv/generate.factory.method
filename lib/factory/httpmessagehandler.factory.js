const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
/**
* Create HttpMessageHandler
* @param {recipientHost,recipientPort,userId,senderHost,senderPort}
*/
function createHttpMessageHandler({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpMessageHandler, variableName:'httpMessageHandler', singleton: false });
    container.config({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.config(createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageHandler };
