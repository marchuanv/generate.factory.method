const { Factory } = require('../factory.js');
const { WebSocketServerResponseMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(WebSocketServerResponseMessageQueueBindingFactoryContainer);

/**
* IsSingleton: WebSocketServerResponseMessageQueueBindingFactoryContainer.singleton
* Create WebSocketServerResponseMessageQueueBinding
* @param {scopeId}
*/
function createWebSocketServerResponseMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketServerResponseMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketServerResponseMessageQueueBinding };
