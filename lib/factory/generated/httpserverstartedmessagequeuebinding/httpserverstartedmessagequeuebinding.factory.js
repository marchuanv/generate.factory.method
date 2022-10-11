const { factory } = require('../../factory.js');

/**
* Create HttpServerStartedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStartedMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpserverstartedmessagequeuebinding//httpserverstartedmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerStartedMessageQueueBinding };
