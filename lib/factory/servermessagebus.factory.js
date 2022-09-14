const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
const { createHttpServerRequestMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.js');
const { createWebSocketServerRequestMessageBus } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.js');
const { createWebSocketServerResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.js');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.prototype.js');
const getServerMessageBusFactoryConfig = require('C:\\component\\lib\\factory\\servermessagebus.factory.config.js');
/**
* IsSingleton: false 
* Create ServerMessageBus 
* @param {scopeId}
*/
function createServerMessageBus({scopeId}) {
    const container = factory.getContainer({ scopeId, type: ServerMessageBus, variableName:'serverMessageBus', singleton: false });
    container.config(getServerMessageBusFactoryConfig());
    container.reference({});
        container.reference(createWebSocketServerResponseMessageBus({scopeId}));
container.reference(createWebSocketServerRequestMessageBus({scopeId}));
container.reference(createHttpServerRequestMessageBus({scopeId}));
container.reference(createHttpServerResponseMessageBus({scopeId}));
container.reference(createMessageConverter({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createServerMessageBus };
