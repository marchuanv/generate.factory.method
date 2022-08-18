const factory = require('./factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createHttpServer } = require('C:\\component\\lib\\factory\\httpserver.factory.js');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBus 
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
        container.config({scopeId,timeout,senderHost,senderPort});
            container.config(createHttpServer({scopeId,timeout,senderHost,senderPort}));
container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
