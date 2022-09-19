const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

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