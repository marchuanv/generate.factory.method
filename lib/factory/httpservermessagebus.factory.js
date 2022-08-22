const factory = require('./factory.js');
const { createSenderAddress } = require('C:\\component\\lib\\factory\\senderaddress.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { HttpServerMessageBus } = require('C:\\component\\lib\\http\\httpservermessagebus.js');
/**
* IsSingleton: false 
* Create HttpServerMessageBus 
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: HttpServerMessageBus, variableName:'httpServerMessageBus', singleton: false });
        container.config({scopeId,timeout,senderHost,senderPort});
            container.config(createLogger({scopeId}));
container.config(createMessageQueue({scopeId}));
container.config(createSenderAddress({scopeId,senderHost,senderPort}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createHttpServerMessageBus };
