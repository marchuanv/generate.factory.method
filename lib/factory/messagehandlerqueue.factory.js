const factory = require('./factory.js');
const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { MessageHandlerQueue } = require('C:\\component\\lib\\messagehandlerqueue.js');
/**
* Create MessageHandlerQueue
* @param {sharedMessageQueue,messageQueueTypeCode}
*/
function createMessageHandlerQueue({sharedMessageQueue,messageQueueTypeCode}) {
    const container = factory.createContainer({ type: MessageHandlerQueue, variableName:'messageHandlerQueue', singleton: false });
    container.config({sharedMessageQueue,messageQueueTypeCode});
    container.config(createMessageQueueType({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createMessageHandlerQueue };
