const factory = require('../../factory.js');

/**
* Create HttpClientMessageBus
* @param {timeout,factoryContainerBindingName}
*/
function createHttpClientMessageBus({timeout,factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientmessagebus//httpclientmessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {timeout} });
}
module.exports = { createHttpClientMessageBus };
