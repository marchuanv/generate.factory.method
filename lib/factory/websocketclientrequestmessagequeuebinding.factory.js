const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagequeuebinding.prototype.js');
const getWebSocketClientRequestMessageQueueBindingFactoryConfig = require('C:\\component\\lib\\factory\\websocketclientrequestmessagequeuebinding.factory.config.js');
/**
* IsSingleton: false 
* Create WebSocketClientRequestMessageQueueBinding 
* @param {scopeId}
*/
function createWebSocketClientRequestMessageQueueBinding({scopeId}) {
    const container = factory.getContainer({ scopeId, type: WebSocketClientRequestMessageQueueBinding, variableName:'websocketClientRequestMessageQueueBinding', singleton: false });
    container.config(getWebSocketClientRequestMessageQueueBindingFactoryConfig());
    container.reference({});
        container.reference(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
