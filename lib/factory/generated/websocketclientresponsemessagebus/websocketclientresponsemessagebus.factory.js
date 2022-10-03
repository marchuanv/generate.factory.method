const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketclientresponsemessagebus//websocketclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketClientResponseMessageBus
* @param {websocketClientResponseMessageQueueBinding,factoryContainerBindingName}
*/
function createWebSocketClientResponseMessageBus({websocketClientResponseMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {websocketClientResponseMessageQueueBinding} });
}
module.exports = { createWebSocketClientResponseMessageBus };
