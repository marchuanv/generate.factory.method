const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { WebSocketResponseMessage } = require('C:\\component\\lib\\websocket\\websocketresponsemessage.js');
/**
* IsSingleton: false 
* Create WebSocketResponseMessage 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketResponseMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    let container = factory.getContainer({ scopeId, type: WebSocketResponseMessage, variableName:'webSocketResponseMessage', singleton: false });
    container.config({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
    container.config(createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketResponseMessage };
