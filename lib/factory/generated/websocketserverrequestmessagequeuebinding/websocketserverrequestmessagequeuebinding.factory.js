const factory = require('../../factory.js');

/**
* Create WebSocketServerRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerRequestMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketserverrequestmessagequeuebinding//websocketserverrequestmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketServerRequestMessageQueueBinding };
