const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketServerResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.js');
const { WebSocketServerResponseMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.container.json');
const { WebSocketServerResponseMessageBus } = require('C:\\component\\lib\\websocket\\websocketserverresponsemessagebus.prototype.js');

/**
* IsSingleton: WebSocketServerResponseMessageBusFactoryContainer.singleton
* Create WebSocketServerResponseMessageBus
* @param {scopeId}
*/
function createWebSocketServerResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketServerResponseMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketServerResponseMessageBusFactoryContainer);
}
module.exports = { createWebSocketServerResponseMessageBus };
