const { Factory } = require('../factory.js');
const { WebSocketClientRequestMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(WebSocketClientRequestMessageQueueBindingFactoryContainer);

/**
* IsSingleton: WebSocketClientRequestMessageQueueBindingFactoryContainer.singleton
* Create WebSocketClientRequestMessageQueueBinding
* @param {scopeId}
*/
function createWebSocketClientRequestMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketClientRequestMessageQueueBindingFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketClientRequestMessageQueueBinding };
