const { Factory } = require('../factory.js');
const factory = new Factory();

const { WebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagequeuebinding.prototype.js');
const getWebSocketClientResponseMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketClientResponseMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createWebSocketClientResponseMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: WebSocketClientResponseMessageQueueBinding, variableName:'websocketClientResponseMessageQueueBinding', singleton: false });
    container.config(getWebSocketClientResponseMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
