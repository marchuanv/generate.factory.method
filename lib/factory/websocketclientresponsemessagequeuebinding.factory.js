const { Factory } = require('../factory.js');
const { WebSocketClientResponseMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(WebSocketClientResponseMessageQueueBindingFactoryContainer);

/**
* IsSingleton: WebSocketClientResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketClientResponseMessageQueueBinding
* @param {scopeId}
*/
function createWebSocketClientResponseMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketClientResponseMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketClientResponseMessageQueueBinding };
