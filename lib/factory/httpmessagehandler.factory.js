const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({recipientHost,recipientPort,userId,senderHost,senderPort}) {
    let container = factory.createContainer(HttpMessageHandler);
    container.add({recipientHost,recipientPort,userId,senderHost,senderPort});
    container.add(createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.add(createHttpServerMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
container.add(createMessageQueue({}));
    const httpMessageHandler = new HttpMessageHandler(container);
    container.add({httpMessageHandler});
    return container;
}
module.exports = { createHttpMessageHandler };
