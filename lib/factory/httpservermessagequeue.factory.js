const factory = require('./factory.js');
const { createMessageQueueType } = require('D:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('D:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { HttpServerMessageQueue } = require('D:\\component\\lib\\http\\httpservermessagequeue.js');
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
