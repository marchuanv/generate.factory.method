const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpserverstartmessagequeuebinding//httpserverstartmessagequeuebinding.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpServerStartMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStartMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerStartMessageQueueBinding };
