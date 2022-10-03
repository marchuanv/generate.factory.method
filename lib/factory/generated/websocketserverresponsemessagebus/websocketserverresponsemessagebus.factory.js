const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverresponsemessagebus//websocketserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketServerResponseMessageBus
* @param {webSocketServerResponseMessageQueueBinding,factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageBus({webSocketServerResponseMessageQueueBinding,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {webSocketServerResponseMessageQueueBinding} });
}
module.exports = { createWebSocketServerResponseMessageBus };
