const factory = require('../../factory.js');

/**
* Create HttpClientStartMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStartMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientstartmessagequeuebinding//httpclientstartmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientStartMessageQueueBinding };
