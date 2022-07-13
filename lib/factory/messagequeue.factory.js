const { FactoryContainer } = require('./factory.container.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({userId,host,port}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({userId,host,port});
    factoryContainer.add(createSenderAddress({host,port}));
    const messageQueue = new MessageQueue(factoryContainer);
    factoryContainer.add({messageQueue});
    return factoryContainer;
}
module.exports = { createMessageQueue };
