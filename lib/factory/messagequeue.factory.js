const factory = require('./factory.js');

const { MessageQueue } = require('C:\\component\\lib\\messagequeue.js');
function createMessageQueue({}) {
    const container = factory.createContainer({ type: MessageQueue, variableName:'messageQueue' });
    container.config({});
    
    container.complete();
    return container;
}
module.exports = { createMessageQueue };
