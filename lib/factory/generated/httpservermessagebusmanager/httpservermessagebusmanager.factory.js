const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpservermessagebusmanager//httpservermessagebusmanager.factory.container.default.binding.json');
const factory = new Factory(container);

/**
* Create HttpServerMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpServerMessageBusManager({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerMessageBusManager };
