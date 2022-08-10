const factory = require('./factory.js');
const { createMessageQueueType } = require('C:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { HttpServerMessageQueue } = require('C:\\component\\lib\\http\\httpservermessagequeue.js');
/**
* Create HttpServerMessageQueue
* @param {messageQueueTypeCode}
*/
function createHttpServerMessageQueue({messageQueueTypeCode}) {
    const container = factory.createContainer({ type: HttpServerMessageQueue, variableName:'httpServerMessageQueue', singleton: false });
    container.config({messageQueueTypeCode});
    container.config(createSharedMessageConverter({}));
container.config(createSharedMessageQueue({}));
container.config(createMessageQueueType({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpServerMessageQueue };
