const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpMessageHandler, variableName:'httpMessageHandler' });
    container.config({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.config(createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.config(createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.config(createMessageQueue({}));
    container.complete();
    return container;
}
module.exports = { createHttpMessageHandler };
