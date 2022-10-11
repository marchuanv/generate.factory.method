const { factory } = require('../../factory.js');

/**
* Create HttpServerResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerResponseMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpserverresponsemessagequeuebinding//httpserverresponsemessagequeuebinding.factory.container.${_factoryContainerBindingFileName}.binding.json`);
    const container = factory.getContainer({ binding: containerBinding });
    return container.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerResponseMessageQueueBinding };
