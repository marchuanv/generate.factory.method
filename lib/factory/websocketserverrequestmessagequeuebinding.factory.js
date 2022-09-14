const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketServerRequestMessageQueueBindingFactoryContainer } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.container.json');
const { WebSocketServerRequestMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketserverrequestmessagequeuebinding.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketServerRequestMessageQueueBindingFactoryContainer);
}
module.exports = { createWebSocketServerRequestMessageQueueBinding };
