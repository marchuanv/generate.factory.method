const factory = require('./factory.js');

const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({}) {
    let container = factory.createContainer(MessageQueue);
    container.add({});
    
    const messageQueue = new MessageQueue(container);
    container.add({messageQueue});
    return container;
}
module.exports = { createMessageQueue };
