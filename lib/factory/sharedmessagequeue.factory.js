const factory = require('./factory.js');
const { createMessageQueueTypes } = require('C:\\component\\lib\\factory\\messagequeuetypes.factory.js');
const { SharedMessageQueue } = require('C:\\component\\lib\\sharedmessagequeue.js');
/**
* Create SharedMessageQueue
* @param {}
*/
function createSharedMessageQueue({}) {
    const container = factory.createContainer({ type: SharedMessageQueue, variableName:'sharedMessageQueue', singleton: true });
    container.config({});
    container.config(createMessageQueueTypes({}));
    container.complete();
    return container.references;
}
module.exports = { createSharedMessageQueue };
