const factory = require('../../factory.js');

/**
* Create HttpClientResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientResponseMessageQueueBinding };
