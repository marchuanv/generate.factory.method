const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//httpservermessagebusmanager//httpservermessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpServerMessageBusManager({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createHttpServerMessageBusManager };
