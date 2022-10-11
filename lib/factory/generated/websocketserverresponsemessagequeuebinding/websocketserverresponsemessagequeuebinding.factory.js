const { factory } = require('../../factory.js');

/**
* Create WebSocketServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createWebSocketServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//websocketserverresponsemessagequeuebinding//websocketserverresponsemessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createWebSocketServerResponseMessageQueueBinding };
