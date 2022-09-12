const factory = require('../factory.js');
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketClientRequestMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientrequestmessagequeuebinding.js');
/**
* IsSingleton: false 
* Create WebSocketClientRequestMessageQueueBinding 
* @param {scopeId}
*/
function createWebSocketClientRequestMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: WebSocketClientRequestMessageQueueBinding, variableName:'websocketClientRequestMessageQueueBinding', singleton: false });
    if (!container) {
        container = factory.createContainer({ scopeId, type: WebSocketClientRequestMessageQueueBinding, variableName:'websocketClientRequestMessageQueueBinding', singleton: false });
        container.config({});
            container.config(createMessageQueue({scopeId}));
    }
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
