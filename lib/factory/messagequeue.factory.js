const { FactoryContainer } = require('./factory.container.js');

const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({userId}) {
    let factoryContainer = new FactoryContainer();
    
    const messageQueue = new MessageQueue({userId});
    factoryContainer.add(messageQueue);
    return factoryContainer;
}
module.exports = { createMessageQueue };
