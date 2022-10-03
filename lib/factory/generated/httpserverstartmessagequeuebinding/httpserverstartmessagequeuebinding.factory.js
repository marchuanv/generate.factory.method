const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpserverstartmessagequeuebinding//httpserverstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerStartMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpServerStartMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpServerStartMessageQueueBinding };
