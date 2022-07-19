const { FactoryContainer } = require('./factory.container.js');

const { MessageQueueType } = require('C:\\component\\lib\\messagequeuetype.js');
function createMessageQueueType({messageQueueTypeCode}) {
    let container = new FactoryContainer();
    container.add({messageQueueTypeCode});
    
    const messageQueueType = new MessageQueueType(container);
    container.add({messageQueueType});
    return container;
}
module.exports = { createMessageQueueType };
