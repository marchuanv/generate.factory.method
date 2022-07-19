const { FactoryContainer } = require('./factory.container.js');

const { MessageQueueType } = require('C:\\component\\lib\\messagequeuetype.js');
function createMessageQueueType({messageQueueTypeCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({messageQueueTypeCode});
    
    const messageQueueType = new MessageQueueType(factoryContainer);
    factoryContainer.add({messageQueueType});
    return factoryContainer;
}
module.exports = { createMessageQueueType };
