const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { MessageHandlerQueue } = require('C:\\component\\lib\\messagehandlerqueue.js');
/**
* Create MessageHandlerQueue
* @param {contextId}
*/
function createMessageHandlerQueue({contextId}) {
    const container = factory.createContainer({ type: MessageHandlerQueue, variableName:'messageHandlerQueue', singleton: false });
    container.config({contextId});
    container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createMessageHandlerQueue };
