const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHostAddress } = require('C:\\component\\lib\\factory\\hostaddress.factory.js');
const { createRecipientAddress } = require('C:\\component\\lib\\factory\\recipientAddress.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,userId,host,hostPort,recipientHost,recipientPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({timeout,userId,host,hostPort,recipientHost,recipientPort});
    factoryContainer.add(createRecipientAddress({recipientHost,recipientPort}));
factoryContainer.add(createHostAddress({host,hostPort}));
factoryContainer.add(createMessageQueue({userId}));
    const httpConnection = new HttpConnection(factoryContainer);
    factoryContainer.add({httpConnection});
    return factoryContainer;
}
module.exports = { createHttpConnection };
