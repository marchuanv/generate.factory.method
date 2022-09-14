const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageConverter } = require('C:\\component\\lib\\factory\\messageconverter.factory.js');
const { createHttpServerResponseMessageBus } = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.js');
const { createHttpServerRequestMessageBus } = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.js');
const { createWebSocketServerRequestMessageBus } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.js');
const { createWebSocketServerResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.js');
const { ServerMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\servermessagebus.container.json');
const { ServerMessageBus } = require('C:\\component\\lib\\servermessagebus.prototype.js');

/**
* IsSingleton: ServerMessageBusFactoryContainer.singleton
* Create ServerMessageBus
* @param {scopeId}
*/
function createServerMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = ServerMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, ServerMessageBusFactoryContainer);
}
module.exports = { createServerMessageBus };
