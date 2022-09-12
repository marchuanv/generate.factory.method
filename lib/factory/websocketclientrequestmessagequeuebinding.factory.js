const { Factory } = require('../factory.js');
const factory = new Factory();

const { WebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagequeuebinding.prototype.js');
const getWebSocketClientRequestMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketClientRequestMessageQueueBinding 
* @param {scopeId,messageQueue}
*/
function createWebSocketClientRequestMessageQueueBinding({scopeId,messageQueue}) {
    const container = factory.getContainer({ scopeId, type: WebSocketClientRequestMessageQueueBinding, variableName:'websocketClientRequestMessageQueueBinding', singleton: false });
    container.config(getWebSocketClientRequestMessageQueueBindingFactoryConfig());
    container.reference({messageQueue});
        
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
