const factory = require('../../factory.js');

/**
* Create HttpClientStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStoppedMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientstoppedmessagequeuebinding//httpclientstoppedmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
