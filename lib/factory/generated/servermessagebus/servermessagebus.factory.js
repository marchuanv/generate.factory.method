const { Factory } = require('../../factory.js');

/**
* Create ServerMessageBus
* @param {factoryContainerBindingName}
*/
function createServerMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//servermessagebus//servermessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createServerMessageBus };
