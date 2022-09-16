const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientRequestMessageBusFactoryContainer.singleton
* Create WebSocketClientRequestMessageBus
* @param {scopeId}
*/
function createWebSocketClientRequestMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketClientRequestMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketClientRequestMessageBus };
