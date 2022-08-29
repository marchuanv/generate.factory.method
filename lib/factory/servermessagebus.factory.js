const factory = require('../factory.js');
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
const { createHttpServerRequestMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.js');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.js');
/**
* IsSingleton: false 
* Create ServerMessageBus 
* @param {scopeId}
*/
function createServerMessageBus({scopeId}) {
    let container = factory.getContainer({ scopeId, type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
        container.config({scopeId});
            container.config(createHttpServerRequestMessageBus({scopeId}));
container.config(createHttpServerResponseMessageBus({scopeId}));
container.config(createMessageConverter({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createServerMessageBus };
