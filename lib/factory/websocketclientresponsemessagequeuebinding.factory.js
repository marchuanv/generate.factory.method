const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagequeuebinding.prototype.js');
const getWebSocketClientResponseMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\websocketclientresponsemessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketClientResponseMessageQueueBinding 
* @param {scopeId}
*/
function createWebSocketClientResponseMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketClientResponseMessageQueueBinding, variableName:'websocketClientResponseMessageQueueBinding', singleton: false });
    container.config(getWebSocketClientResponseMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
