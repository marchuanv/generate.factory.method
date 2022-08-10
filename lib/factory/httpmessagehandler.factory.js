const factory = require('./factory.js');
const { createMessageHandlerQueue } = require('D:\\component\\lib\\factory\\messagehandlerqueue.factory.js');
const { createHttpServerMessageQueue } = require('D:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createHttpClientMessageQueue } = require('D:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { HttpMessageHandler } = require('D:\\component\\lib\\http\\httpmessagehandler.js');
/**
* Create HttpMessageHandler
* @param {messageQueueTypeCode}
*/
function createHttpMessageHandler({messageQueueTypeCode}) {
    const container = factory.createContainer({ type: HttpMessageHandler, variableName:'httpMessageHandler', singleton: false });
    container.config({messageQueueTypeCode});
    container.config(createHttpClientMessageQueue({messageQueueTypeCode}));
container.config(createHttpServerMessageQueue({messageQueueTypeCode}));
container.config(createMessageHandlerQueue({messageQueueTypeCode}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageHandler };
