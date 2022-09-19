const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\websocketrequestmessage.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: WebSocketRequestMessageFactoryContainer.singleton
* Create WebSocketRequestMessage
* @param {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketRequestMessage({messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {messageStatusCode,scopeId,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = WebSocketRequestMessageFactoryContainer.bindings[scopeId];
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
module.exports = { createWebSocketRequestMessage };
