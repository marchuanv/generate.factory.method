const factory = require('./factory.js');
const { createSharedMessageQueue } = require('C:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { HttpClientMessageQueue } = require('C:\\component\\lib\\http\\httpclientmessagequeue.js');
/**
* Create HttpClientMessageQueue
* @param {contextId}
*/
function createHttpClientMessageQueue({contextId}) {
    const container = factory.createContainer({ type: HttpClientMessageQueue, variableName:'httpClientMessageQueue', singleton: false });
    container.config({contextId});
    container.config(createSharedMessageConverter({}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpClientMessageQueue };
