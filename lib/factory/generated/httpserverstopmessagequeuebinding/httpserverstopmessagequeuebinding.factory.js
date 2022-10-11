const factory = require('../../factory.js');

/**
* Create HttpServerStopMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStopMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpserverstopmessagequeuebinding//httpserverstopmessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerStopMessageQueueBinding };
