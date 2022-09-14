const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketServerResponseMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.container.json');
const { WebSocketServerResponseMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketserverresponsemessagequeuebinding.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketServerResponseMessageQueueBindingFactoryContainer);
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
