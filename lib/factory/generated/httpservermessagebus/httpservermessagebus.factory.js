const { Factory } = require('../../factory.js');
const container = require('C://component//lib//factory//generated//httpservermessagebus//httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerMessageBus
* @param {timeout,factoryContainerBindingName}
*/
function createHttpServerMessageBus({timeout,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {timeout} });
}
module.exports = { createHttpServerMessageBus };
