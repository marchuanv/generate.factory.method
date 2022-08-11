const factory = require('./factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createMessageHandlerQueue } = require('C:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
/**
* Create HttpMessageHandler
* @param {messageQueueContextId,messageQueueTypeCode}
*/
function createHttpMessageHandler({messageQueueContextId,messageQueueTypeCode}) {
    const container = factory.createContainer({ type: HttpMessageHandler, variableName:'httpMessageHandler', singleton: false });
    container.config({messageQueueContextId,messageQueueTypeCode});
    container.config(createMessageHandlerQueue({messageQueueContextId,messageQueueTypeCode}));
container.config(createHttpClientMessageQueue({messageQueueContextId,messageQueueTypeCode}));
container.config(createHttpServerMessageQueue({messageQueueContextId,messageQueueTypeCode}));
container.config(createSharedMessageConverter({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageHandler };
