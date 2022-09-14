const { Factory } = require('../factory.js');
const factory = new Factory();
const { createWebSocketServerRequestMessageQueueBinding } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.js');
const { WebSocketServerRequestMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.container.json');
const { WebSocketServerRequestMessageBus } = require('C:\\component\\lib\\websocket\\websocketserverrequestmessagebus.prototype.js');

/**
* IsSingleton: WebSocketServerRequestMessageBusFactoryContainer.singleton
* Create WebSocketServerRequestMessageBus
* @param {scopeId}
*/
function createWebSocketServerRequestMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketServerRequestMessageBusFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketServerRequestMessageBusFactoryContainer);
}
module.exports = { createWebSocketServerRequestMessageBus };
