const { Factory } = require('../factory.js');
const factory = new Factory();

const { WebSocketRequestMessage } = require('C:\\component\\lib\\websocket\\websocketrequestmessage.prototype.js');
const getWebSocketRequestMessageFactoryConfig = require('C:\\component\\lib\\factory\\websocketrequestmessage.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketRequestMessage 
* @param {scopeId,message}
*/
function createWebSocketRequestMessage({scopeId,message}) {
    const container = factory.getContainer({ scopeId, type: WebSocketRequestMessage, variableName:'webSocketRequestMessage', singleton: false });
    container.config(getWebSocketRequestMessageFactoryConfig());
    container.reference({message});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketRequestMessage };
