const { FactoryContainer } = require('./factory.container.js');
const { createSharedMessageQueues } = require('C:\\component\\lib\\factory\\sharedmessagequeues.factory.js');
const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({messageQueueTypeCode}) {
    let factoryContainer = new FactoryContainer();
    factoryContainer.add({messageQueueTypeCode});
    factoryContainer.add(createMessageQueueType({messageQueueTypeCode}));
factoryContainer.add(createSharedMessageQueues({}));
    const messageQueue = new MessageQueue(factoryContainer);
    factoryContainer.add({messageQueue});
    return factoryContainer;
}
module.exports = { createMessageQueue };
