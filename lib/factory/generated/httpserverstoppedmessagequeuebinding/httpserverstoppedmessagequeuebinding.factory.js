const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpserverstoppedmessagequeuebinding//httpserverstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerStoppedMessageQueueBinding
* @param {messageQueue,factoryContainerBindingName}
*/
function createHttpServerStoppedMessageQueueBinding({messageQueue,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {messageQueue} });
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
