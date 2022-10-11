const { factory } = require('../../factory.js');

/**
* Create HttpServerMessageBus
* @param {timeout,senderHost,senderPort,factoryContainerBindingName}
*/
function createHttpServerMessageBus({timeout,senderHost,senderPort,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpservermessagebus//httpservermessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {timeout,senderHost,senderPort} });
}
module.exports = { createHttpServerMessageBus };
