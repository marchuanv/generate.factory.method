const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.js');
const { WebSocketClientResponseMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.container.json');
const { WebSocketClientResponseMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagebus.prototype.js');

/**
* IsSingleton: WebSocketClientResponseMessageBusFactoryContainer.singleton
* Create WebSocketClientResponseMessageBus
* @param {scopeId}
*/
function createWebSocketClientResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = WebSocketClientResponseMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketClientResponseMessageBusFactoryContainer);
}
module.exports = { createWebSocketClientResponseMessageBus };
