const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketServerResponseMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketserverresponsemessagequeuebinding.prototype.js');
const getWebSocketServerResponseMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\websocketserverresponsemessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketServerResponseMessageQueueBinding 
* @param {scopeId}
*/
function createWebSocketServerResponseMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketServerResponseMessageQueueBinding, variableName:'webSocketServerResponseMessageQueueBinding', singleton: false });
    container.config(getWebSocketServerResponseMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
