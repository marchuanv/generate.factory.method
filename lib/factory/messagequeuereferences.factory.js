const { FactoryContainer } = require('./factory.container.js');

const { MessageQueueReferences } = require('C:\\component\\lib\\messagequeuereferences.js');
function createMessageQueueReferences({}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({});
    
    const messageQueueReferences = new MessageQueueReferences(factoryContainer);
    factoryContainer.add({messageQueueReferences});
    return factoryContainer;
}
module.exports = { createMessageQueueReferences };
