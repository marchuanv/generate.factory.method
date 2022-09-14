const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.js');
const { WebSocketClientRequestMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\websocketclientrequestmessagebus.container.json');
const { WebSocketClientRequestMessageBus } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagebus.prototype.js');

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
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketClientRequestMessageBusFactoryContainer);
}
module.exports = { createWebSocketClientRequestMessageBus };
