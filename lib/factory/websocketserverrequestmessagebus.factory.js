const { Factory } = require('../factory.js');
const { WebSocketServerRequestMessageBusFactoryContainer } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.container.json');
const { WebSocketServerRequestMessageBus } = require('C:\\component\\lib\\websocket\\websocketserverrequestmessagebus.prototype.js');
const { createWebSocketServerRequestMessageBus } = require('C:\\component\\lib\\factory\\websocketserverrequestmessagebus.factory.js');

const factory = new Factory(WebSocketServerRequestMessageBusFactoryContainer);

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
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ scopeId });
}
module.exports = { createWebSocketServerRequestMessageBus };
