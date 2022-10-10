const { Factory } = require('../../factory.js');

/**
* Create HttpClientResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientresponsemessagequeuebinding//httpclientresponsemessagequeuebinding.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientResponseMessageQueueBinding };
