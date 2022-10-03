const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketserverrequestmessagequeuebinding//websocketserverrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketServerRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketServerRequestMessageQueueBinding };
