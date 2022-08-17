const factory = require('./factory.js');
const { createSharedMessageQueue } = require('D:\\component\\lib\\factory\\sharedmessagequeue.factory.js');
const { createSharedHttpServer } = require('D:\\component\\lib\\factory\\sharedhttpserver.factory.js');
const { HttpServerMessageBus } = require('D:\\component\\lib\\http\\httpservermessagebus.js');
/**
* Create HttpServerMessageBus
* @param {contextId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({contextId,timeout,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    container.config({contextId,timeout,senderHost,senderPort});
    container.config(createSharedHttpServer({timeout,senderHost,senderPort}));
container.config(createSharedMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
