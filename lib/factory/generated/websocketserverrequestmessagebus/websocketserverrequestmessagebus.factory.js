const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverrequestmessagebus//websocketserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketServerRequestMessageBus
* @param {webSocketServerRequestMessageQueueBinding,factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageBus({webSocketServerRequestMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {webSocketServerRequestMessageQueueBinding} });
}
module.exports = { createWebSocketServerRequestMessageBus };
