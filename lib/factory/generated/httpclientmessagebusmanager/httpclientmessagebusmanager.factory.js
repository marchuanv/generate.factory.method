const factory = require('../../factory.js');

/**
* Create HttpClientMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpClientMessageBusManager({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientmessagebusmanager//httpclientmessagebusmanager.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientMessageBusManager };
