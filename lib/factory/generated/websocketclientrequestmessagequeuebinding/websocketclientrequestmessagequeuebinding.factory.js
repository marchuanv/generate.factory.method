const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketclientrequestmessagequeuebinding//websocketclientrequestmessagequeuebinding.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create WebSocketClientRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketClientRequestMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
