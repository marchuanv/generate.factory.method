const factory = require('./factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createHttpServerMessageBus } = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.js');
const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
const { createHttpServerRequestsMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestsmessagebus.factory.js');
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
            container.config(createHttpServerRequestsMessageBus({scopeId}));
container.config(createHttpServerResponseMessageBus({scopeId}));
container.config(createHttpServerMessageBus({scopeId,timeout,senderHost,senderPort}));
container.config(createMessageConverter({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createServerMessageBus };
