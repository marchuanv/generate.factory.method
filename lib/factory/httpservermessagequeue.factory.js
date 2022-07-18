const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpServerMessageQueue } = require('C:\\component\\lib\\http\\httpservermessagequeue.js');
function createHttpServerMessageQueue({userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,senderHost,senderPort});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
    const httpServerMessageQueue = new HttpServerMessageQueue(factoryContainer);
    factoryContainer.add({httpServerMessageQueue});
    return factoryContainer;
}
module.exports = { createHttpServerMessageQueue };
