const { Factory } = require('../../factory.js');

/**
* Create HttpServerMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpServerMessageBusManager({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpservermessagebusmanager//httpservermessagebusmanager.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerMessageBusManager };
