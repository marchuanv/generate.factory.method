const { Factory } = require('../../factory.js');

/**
* Create HttpServerRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerRequestMessageQueueBinding({factoryContainerBindingName}) {
    const _factoryContainerBindingFileName = factoryContainerBindingName ? factoryContainerBindingName.toLowerCase() : 'default';
    const containerBinding = require(`C://component//lib//factory//generated//httpserverrequestmessagequeuebinding//httpserverrequestmessagequeuebinding.factory.container.multiplerequestsspec.binding.json`);
    const factory = new Factory(containerBinding);
    return factory.getInstance({ ctorArgs: {} });
}
module.exports = { createHttpServerRequestMessageQueueBinding };
