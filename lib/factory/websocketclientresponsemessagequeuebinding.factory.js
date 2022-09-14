const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketClientResponseMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.container.json');
const { WebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagequeuebinding.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketClientResponseMessageQueueBindingFactoryContainer);
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
