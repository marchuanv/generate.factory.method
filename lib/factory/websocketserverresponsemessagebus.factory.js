const { Factory } = require('../factory.js');
const { WebSocketServerResponseMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.container.json');
const { WebSocketServerResponseMessageBus } = require('C:\\component\\lib\\websocket\\websocketserverresponsemessagebus.prototype.js');
const { createWebSocketServerResponseMessageBus } = require('C:\\component\\lib\\factory\\websocketserverresponsemessagebus.factory.js');

const factory = new Factory(WebSocketServerResponseMessageBusFactoryContainer);

/**
* IsSingleton: WebSocketServerResponseMessageBusFactoryContainer.singleton
* Create WebSocketServerResponseMessageBus
* @param {scopeId}
*/
function createWebSocketServerResponseMessageBus({scopeId}) {
    const args = {scopeId};
    const binding = WebSocketServerResponseMessageBusFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketServerResponseMessageBus };
