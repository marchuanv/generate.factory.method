const factory = require('./factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSenderAddress } = require('D:\\component\\lib\\factory\\senderaddress.factory.js');
const { HttpServerMessageBus } = require('D:\\component\\lib\\http\\httpservermessagebus.js');
/**
* Create HttpServerMessageBus
* @param {contextId,senderHost,senderPort,timeout}
*/
function createHttpServerMessageBus({contextId,senderHost,senderPort,timeout}) {
    const container = factory.createContainer({ type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    container.config({contextId,senderHost,senderPort,timeout});
    container.config(createSenderAddress({senderHost,senderPort}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
