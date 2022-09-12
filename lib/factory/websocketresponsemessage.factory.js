const { Factory } = require('../factory.js');
const factory = new Factory();

const { WebSocketResponseMessage } = require('C:\\component\\lib\\websocket\\websocketresponsemessage.prototype.js');
const getWebSocketResponseMessageFactoryConfig = require('C:\\component\\lib\\factory\\websocketresponsemessage.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketResponseMessage 
* @param {scopeId,message}
*/
function createWebSocketResponseMessage({scopeId,message}) {
    const container = factory.getContainer({ scopeId, type: WebSocketResponseMessage, variableName:'webSocketResponseMessage', singleton: false });
    container.config(getWebSocketResponseMessageFactoryConfig());
    container.reference({message});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketResponseMessage };
