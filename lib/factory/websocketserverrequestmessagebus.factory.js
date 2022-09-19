const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerRequestMessageBusFactoryContainer.singleton
* Create WebSocketServerRequestMessageBus
* @param {scopeId}
*/
function createWebSocketServerRequestMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketServerRequestMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketServerRequestMessageBus };
