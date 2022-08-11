const factory = require('./factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpMessageBus } = require('C:\\component\\lib\\http\\httpmessagebus.js');
/**
* Create HttpMessageBus
* @param {messageQueueContextId,senderHost,senderPort,timeout}
*/
function createHttpMessageBus({messageQueueContextId,senderHost,senderPort,timeout}) {
    const container = factory.createContainer({ type: HttpMessageBus, variableName:'httpMessageBus', singleton: false });
    container.config({messageQueueContextId,senderHost,senderPort,timeout});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createHttpServerMessageQueue({messageQueueContextId}));
container.config(createHttpClientMessageQueue({messageQueueContextId}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageBus };
