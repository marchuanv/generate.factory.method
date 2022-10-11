const { Factory } = require('../../factory.js');

/**
* Create HttpServerStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStoppedMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpserverstoppedmessagequeuebinding//httpserverstoppedmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
