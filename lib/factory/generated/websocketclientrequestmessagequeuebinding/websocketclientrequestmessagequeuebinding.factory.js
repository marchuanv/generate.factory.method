const factory = require('../../factory.js');

/**
* Create WebSocketClientRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketClientRequestMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketclientrequestmessagequeuebinding//websocketclientrequestmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketClientRequestMessageQueueBinding };
