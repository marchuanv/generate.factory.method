const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
function createHttpMessageHandler({userId,senderHost,senderPort,recipientHost,recipientPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,senderHost,senderPort,recipientHost,recipientPort});
    factoryContainer.add(createHttpClientMessageQueue({recipientHost,recipientPort,userId,senderHost,senderPort}));
factoryContainer.add(createHttpServerMessageQueue({userId,senderHost,senderPort}));
factoryContainer.add(createMessageQueue({userId}));
    const httpMessageHandler = new HttpMessageHandler(factoryContainer);
    factoryContainer.add({httpMessageHandler});
    return factoryContainer;
}
module.exports = { createHttpMessageHandler };
