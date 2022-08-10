const factory = require('./factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createMessageQueueType } = require('D:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { MessageHandlerQueue } = require('D:\\component\\lib\\messagehandlerqueue.js');
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
