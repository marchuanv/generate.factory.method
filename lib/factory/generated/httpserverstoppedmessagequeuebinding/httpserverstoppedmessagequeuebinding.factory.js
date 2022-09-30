const { Factory } = require('./../factory.js');
const container = require('C://component//lib//factory//generated//httpserverstoppedmessagequeuebinding//httpserverstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStoppedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
