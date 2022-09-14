const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketClientRequestMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.container.json');
const { WebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagequeuebinding.prototype.js');

/**
* IsSingleton: WebSocketClientRequestMessageQueueBindingFactoryContainer.singleton
* Create WebSocketClientRequestMessageQueueBinding
* @param {scopeId}
*/
function createWebSocketClientRequestMessageQueueBinding({scopeId}) {
    const args = {scopeId};
    const { scopeId } = args;
    const binding = WebSocketClientRequestMessageQueueBindingFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketClientRequestMessageQueueBindingFactoryContainer);
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
