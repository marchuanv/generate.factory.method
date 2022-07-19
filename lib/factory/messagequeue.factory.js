const { FactoryContainer } = require('./factory.container.js');
const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({messageQueueTypeCode}) {
    let container = new FactoryContainer();
    container.add({messageQueueTypeCode});
    container.add(createMessageQueueType({messageQueueTypeCode}));
    const messageQueue = new MessageQueue(container);
    container.add({messageQueue});
    return container;
}
module.exports = { createMessageQueue };
