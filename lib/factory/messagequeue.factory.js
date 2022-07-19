const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueueReferences } = require('C:\\component\\lib\\factory\\messagequeuereferences.factory.js');
const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({isSyncedMessageQueueTypes,messageQueueTypeCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({isSyncedMessageQueueTypes,messageQueueTypeCode});
    factoryContainer.add(createMessageQueueType({messageQueueTypeCode}));
factoryContainer.add(createMessageQueueReferences({}));
    const messageQueue = new MessageQueue(factoryContainer);
    factoryContainer.add({messageQueue});
    return factoryContainer;
}
module.exports = { createMessageQueue };
