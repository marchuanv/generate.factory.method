const factory = require('./factory.js');

const { SharedMessageQueue } = require('C:\\component\\lib\\sharedmessagequeue.js');
/**
* Create SharedMessageQueue
* @param {messageQueueTypeArray}
*/
function createSharedMessageQueue({messageQueueTypeArray}) {
    const container = factory.createContainer({ type: SharedMessageQueue, variableName:'sharedMessageQueue', singleton: true });
    container.config({messageQueueTypeArray});
    
    container.complete();
    return container.references;
}
module.exports = { createSharedMessageQueue };
