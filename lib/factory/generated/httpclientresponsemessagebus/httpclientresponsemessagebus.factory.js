const factory = require('../../factory.js');

/**
* Create HttpClientResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageBus({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientresponsemessagebus//httpclientresponsemessagebus.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientResponseMessageBus };
