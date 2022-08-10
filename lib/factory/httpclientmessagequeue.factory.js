const factory = require('./factory.js');
const { createMessageQueueType } = require('D:\\component\\lib\\factory\\messagequeuetype.factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('D:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { HttpClientMessageQueue } = require('D:\\component\\lib\\http\\httpclientmessagequeue.js');
/**
* Create HttpClientMessageQueue
* @param {messageQueueTypeCode}
*/
function createHttpClientMessageQueue({messageQueueTypeCode}) {
    const container = factory.createContainer({ type: HttpClientMessageQueue, variableName:'httpClientMessageQueue', singleton: false });
    container.config({messageQueueTypeCode});
    container.config(createSharedMessageConverter({}));
container.config(createSharedMessageQueue({}));
container.config(createMessageQueueType({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpClientMessageQueue };
