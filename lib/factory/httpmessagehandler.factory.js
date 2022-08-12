const factory = require('./factory.js');
const { createSharedMessageConverter } = require('C:\\component\\lib\\factory\\sharedmessageconverter.factory.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { createHttpClientMessageBus } = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.js');
const { createMessageBus } = require('C:\\component\\lib\\factory\\messagebus.factory.js');
const { HttpMessageHandler } = require('C:\\component\\lib\\http\\httpmessagehandler.js');
/**
* Create HttpMessageHandler
* @param {contextId,senderHost,senderPort,timeout}
*/
function createHttpMessageHandler({contextId,senderHost,senderPort,timeout}) {
    const container = factory.createContainer({ type: HttpMessageHandler, variableName:'httpMessageHandler', singleton: false });
    container.config({contextId,senderHost,senderPort,timeout});
    container.config(createMessageBus({contextId}));
container.config(createHttpClientMessageBus({timeout,contextId}));
container.config(createHttpServerMessageBus({contextId,senderHost,senderPort,timeout}));
container.config(createSharedMessageConverter({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageHandler };
