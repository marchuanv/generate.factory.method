const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketclientrequestmessagebus//websocketclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketClientRequestMessageBus
* @param {websocketClientRequestMessageQueueBinding,factoryContainerBindingName}
*/
function createWebSocketClientRequestMessageBus({websocketClientRequestMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {websocketClientRequestMessageQueueBinding} });
}
module.exports = { createWebSocketClientRequestMessageBus };
