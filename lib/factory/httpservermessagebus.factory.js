const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServer } = require('C:\\component\\lib\\factory\\httpserver.factory.js');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.js');
/**
* Create HttpServerMessageBus
* @param {contextId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({contextId,timeout,senderHost,senderPort}) {
    const container = factory.createContainer({ type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    container.config({contextId,timeout,senderHost,senderPort});
    container.config(createHttpServer({timeout,senderHost,senderPort}));
container.config(createMessageQueue({}));
    container.complete();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
