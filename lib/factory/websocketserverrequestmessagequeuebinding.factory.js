const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketServerRequestMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketserverrequestmessagequeuebinding.prototype.js');
const getWebSocketServerRequestMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\websocketserverrequestmessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketServerRequestMessageQueueBinding 
* @param {scopeId}
*/
function createWebSocketServerRequestMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketServerRequestMessageQueueBinding, variableName:'webSocketServerRequestMessageQueueBinding', singleton: false });
    container.config(getWebSocketServerRequestMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketServerRequestMessageQueueBinding };
