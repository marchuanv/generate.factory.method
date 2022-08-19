const factory = require('./factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { createLogger } = require('C:\\component\\lib\\factory\\logger.factory.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.js');
/**
* IsSingleton: false 
* Create ServerMessageBus 
* @param {scopeId,timeout,senderHost,senderPort}
*/
function createServerMessageBus({scopeId,timeout,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: ServerMessageBus, variableName:'serverMessageBus' });
    if (!container) {
        container = factory.createContainer({ scopeId, type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
        container.config({scopeId,timeout,senderHost,senderPort});
            container.config(createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}));
container.config(createLogger({scopeId}));
container.config(createMessageQueue({scopeId}));
container.config(createMessageConverter({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createServerMessageBus };
