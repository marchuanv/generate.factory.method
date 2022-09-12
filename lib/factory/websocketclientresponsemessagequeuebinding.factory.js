const { Factory } = require('../factory.js');
const factory = new Factory();
const { createMessageQueue } = require('C:\\component\\lib\\factory\\messagequeue.factory.js');
const { WebSocketClientResponseMessageQueueBinding } = require('C:\\component\\lib\\websocket\\websocketclientresponsemessagequeuebinding.js');
/**
* IsSingleton: false 
* Create WebSocketClientResponseMessageQueueBinding 
* @param {scopeId}
*/
function createWebSocketClientResponseMessageQueueBinding({scopeId}) {
    let container = factory.getContainer({ scopeId, type: WebSocketClientResponseMessageQueueBinding, variableName:'websocketClientResponseMessageQueueBinding', singleton: false });
    container.config({});
    container.config(createMessageQueue({scopeId}));
    container.ensureInstance();
    return container.references;
}
module.exports = { createWebSocketClientResponseMessageQueueBinding };
