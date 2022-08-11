const factory = require('./factory.js');
const { createHttpClientMessageQueue } = require('C:\\component\\lib\\factory\\httpclientmessagequeue.factory.js');
const { createHttpServerMessageQueue } = require('C:\\component\\lib\\factory\\httpservermessagequeue.factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpMessageBus } = require('C:\\component\\lib\\http\\httpmessagebus.js');
/**
* Create HttpMessageBus
* @param {contextId,senderHost,senderPort,timeout}
*/
function createHttpMessageBus({contextId,senderHost,senderPort,timeout}) {
    const container = factory.createContainer({ type: HttpMessageBus, variableName:'httpMessageBus', singleton: false });
    container.config({contextId,senderHost,senderPort,timeout});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createHttpServerMessageQueue({contextId}));
container.config(createHttpClientMessageQueue({contextId}));
    container.complete();
    return container.references;
}
module.exports = { createHttpMessageBus };
