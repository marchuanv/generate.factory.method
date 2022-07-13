const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHostAddress } = require('C:\\component\\lib\\factory\\hostaddress.factory.js');
const { HttpConnection } = require('C:\\component\\lib\\http\\httpconnection.js');
function createHttpConnection({timeout,userId,senderHost,senderPort,host,hostPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({timeout,userId,senderHost,senderPort,host,hostPort});
    factoryContainer.add(createHostAddress({host,hostPort}));
factoryContainer.add(createMessageQueue({userId,senderHost,senderPort}));
    const httpConnection = new HttpConnection(factoryContainer);
    factoryContainer.add({httpConnection});
    return factoryContainer;
}
module.exports = { createHttpConnection };
