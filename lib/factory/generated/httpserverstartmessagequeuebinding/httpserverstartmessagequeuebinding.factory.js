const { factory } = require('../../factory.js');

/**
* Create HttpServerStartMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStartMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpserverstartmessagequeuebinding//httpserverstartmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerStartMessageQueueBinding };
