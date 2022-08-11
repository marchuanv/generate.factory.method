const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { EventQueue } = require('C:\\component\\lib\\eventqueue.js');
/**
* Create EventQueue
* @param {messageQueueContextId}
*/
function createEventQueue({messageQueueContextId}) {
    const container = factory.createContainer({ type: EventQueue, variableName:'eventQueue', singleton: false });
    container.config({messageQueueContextId});
    container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createEventQueue };
