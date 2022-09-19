const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketresponsemessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketResponseMessageFactoryContainer.singleton
* Create WebSocketResponseMessage
* @param {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketResponseMessage({factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {factoryContainerBindingName,messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = WebSocketResponseMessageFactoryContainer.bindings[factoryContainerBindingName];
    if (!binding) {
        throw new Error(`binding ${factoryContainerBindingName} not found.`);
    }
    for(const key of Object.keys(args)) {
        if (binding.primitiveArgs[key]) {
            binding.primitiveArgs[key] = args[key];
        }
    };
    return factory.getInstance({ factoryContainerBindingName });
}
module.exports = { createWebSocketResponseMessage };
