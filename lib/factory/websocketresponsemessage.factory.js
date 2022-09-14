const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { WebSocketResponseMessageFactoryContainer } = require('C:\\component\\lib\\factory\\websocketresponsemessage.container.json');
const { WebSocketResponseMessage } = require('C:\\component\\lib\\websocket\\websocketresponsemessage.prototype.js');

/**
* IsSingleton: WebSocketResponseMessageFactoryContainer.singleton
* Create WebSocketResponseMessage
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketResponseMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const binding = WebSocketResponseMessageFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketResponseMessageFactoryContainer);
}
module.exports = { createWebSocketResponseMessage };
