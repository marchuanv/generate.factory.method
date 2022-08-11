const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { HttpServerMessageQueue } = require('C:\\component\\lib\\http\\httpservermessagequeue.js');
/**
* Create HttpServerMessageQueue
* @param {messageQueueContextId}
*/
function createHttpServerMessageQueue({messageQueueContextId}) {
    const container = factory.createContainer({ type: HttpServerMessageQueue, variableName:'httpServerMessageQueue', singleton: false });
    container.config({messageQueueContextId});
    container.config(createSharedMessageConverter({}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpServerMessageQueue };
