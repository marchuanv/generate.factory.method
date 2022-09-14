const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { WebSocketRequestMessageFactoryContainer } = require('C:\\component\\lib\\factory\\websocketrequestmessage.container.json');
const { WebSocketRequestMessage } = require('C:\\component\\lib\\websocket\\websocketrequestmessage.prototype.js');

/**
* IsSingleton: WebSocketRequestMessageFactoryContainer.singleton
* Create WebSocketRequestMessage
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketRequestMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const args = {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort};
    const { scopeId } = args;
    const binding = WebSocketRequestMessageFactoryContainer.bindings[scopeId];
    if (!binding) {
        throw new Error(`no binding found for scope: ${scopeId}`);
    }
    for(const key of Object.keys(args)) {
       binding.primitiveArgs[key] = args[key];
    };
    return factory.getInstance({ scopeId }, WebSocketRequestMessageFactoryContainer);
}
module.exports = { createWebSocketRequestMessage };
