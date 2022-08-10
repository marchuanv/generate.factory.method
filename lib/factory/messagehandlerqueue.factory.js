const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { MessageHandlerQueue } = require('C:\\component\\lib\\messagehandlerqueue.js');
/**
* Create MessageHandlerQueue
* @param {messageQueueTypeCode}
*/
function createMessageHandlerQueue({messageQueueTypeCode}) {
    const container = factory.createContainer({ type: MessageHandlerQueue, variableName:'messageHandlerQueue', singleton: false });
    container.config({messageQueueTypeCode});
    container.config(createMessageQueueType({messageQueueTypeCode}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createMessageHandlerQueue };
