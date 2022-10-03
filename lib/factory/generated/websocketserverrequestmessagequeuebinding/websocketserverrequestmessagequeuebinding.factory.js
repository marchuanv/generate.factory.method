const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverrequestmessagequeuebinding//websocketserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketServerRequestMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createWebSocketServerRequestMessageQueueBinding };
