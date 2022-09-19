const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

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
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createWebSocketServerResponseMessageBus };
