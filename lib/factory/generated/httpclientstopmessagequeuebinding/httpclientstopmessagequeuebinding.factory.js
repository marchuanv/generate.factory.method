const { factory } = require('../../factory.js');

/**
* Create HttpClientStopMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStopMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpclientstopmessagequeuebinding//httpclientstopmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpClientStopMessageQueueBinding };
