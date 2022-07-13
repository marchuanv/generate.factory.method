const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({userId,senderHost,senderPort}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,senderHost,senderPort});
    factoryContainer.add(createSenderAddress({senderHost,senderPort}));
    const messageQueue = new MessageQueue(factoryContainer);
    factoryContainer.add({messageQueue});
    return factoryContainer;
}
module.exports = { createMessageQueue };
