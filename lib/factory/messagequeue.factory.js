const { FactoryContainer } = require('./factory.container.js');

const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({});
    
    const messageQueue = new MessageQueue(factoryContainer);
    factoryContainer.add({messageQueue});
    return factoryContainer;
}
module.exports = { createMessageQueue };
