const { Factory } = require('../factory.js');
const { WebSocketClientResponseMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.container.json');
const { WebSocketClientResponseMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagebus.prototype.js');
const { createWebSocketClientResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.js');

const factory = new Factory(WebSocketClientResponseMessageBusFactoryContainer);

/**
* IsSingleton: WebSocketClientResponseMessageBusFactoryContainer.singleton
* Create WebSocketClientResponseMessageBus
* @param {scopeId}
*/
function createWebSocketClientResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketClientResponseMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createWebSocketClientResponseMessageBus };
