const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketServerRequestMessageQueueBindingFactoryContainer.singleton
* Create WebSocketServerRequestMessageQueueBinding
* @param {scopeId}
*/
function createWebSocketServerRequestMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketServerRequestMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketServerRequestMessageQueueBinding };
