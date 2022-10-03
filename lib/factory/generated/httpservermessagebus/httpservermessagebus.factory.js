const { Factory } = require('../../factory.js');
const container = require('D://component//lib//factory//generated//httpservermessagebus//httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* Create HttpServerMessageBus
* @param {timeout,senderHost,senderPort,factoryContainerBindingName}
*/
function createHttpServerMessageBus({timeout,senderHost,senderPort,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {timeout,senderHost,senderPort} });
}
module.exports = { createHttpServerMessageBus };
