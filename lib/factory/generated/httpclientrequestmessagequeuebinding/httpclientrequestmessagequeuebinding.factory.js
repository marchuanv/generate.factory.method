const factory = require('../../factory.js');

/**
* Create HttpClientRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientrequestmessagequeuebinding//httpclientrequestmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientRequestMessageQueueBinding };
