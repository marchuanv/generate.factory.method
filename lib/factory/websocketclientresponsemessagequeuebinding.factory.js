const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketClientResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketClientResponseMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createWebSocketClientResponseMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const args = {factoryContainerBindingName,scopeId};
    const binding = WebSocketClientResponseMessageQueueBindingFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
