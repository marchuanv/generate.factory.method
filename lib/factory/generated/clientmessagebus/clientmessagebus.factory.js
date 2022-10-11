const { Factory } = require('../../factory.js');

/**
* Create ClientMessageBus
* @param {factoryContainerBindingName}
*/
function createClientMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//clientmessagebus//clientmessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createClientMessageBus };
