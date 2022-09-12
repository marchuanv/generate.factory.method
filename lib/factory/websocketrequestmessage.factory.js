const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessage } = require('C:\\component\\lib\\factory\\message.factory.js');
const { WebSocketRequestMessage } = require('C:\\component\\lib\\websocket\\websocketrequestmessage.prototype.js');
const getWebSocketRequestMessageFactoryConfig = require('C:\\component\\lib\\factory\\websocketrequestmessage.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketRequestMessage 
* @param {scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}
*/
function createWebSocketRequestMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}) {
    const container = factory.getContainer({ scopeId, type: WebSocketRequestMessage, variableName:'webSocketRequestMessage', singleton: false });
    container.config(getWebSocketRequestMessageFactoryConfig());
    container.reference({messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort});
        container.reference(createMessage({scopeId,messageStatusCode,Id,data,recipientHost,recipientPort,metadata,token,senderHost,senderPort}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketRequestMessage };
