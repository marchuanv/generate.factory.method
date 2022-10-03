const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//websocketclientrequestmessagequeuebinding//websocketclientrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create WebSocketClientRequestMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createWebSocketClientRequestMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
