const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpserverstartedmessagequeuebinding//httpserverstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerStartedMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpServerStartedMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpServerStartedMessageQueueBinding };
