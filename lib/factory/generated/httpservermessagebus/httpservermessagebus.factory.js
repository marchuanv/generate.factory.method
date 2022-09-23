const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpservermessagebus\\httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusFactoryContainer.singleton
* Create HttpServerMessageBus
* @param {timeout,factoryContainerBindingName,senderHost,senderPort}
*/
function createHttpServerMessageBus({timeout,factoryContainerBindingName,senderHost,senderPort}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {timeout,factoryContainerBindingName,senderHost,senderPort} });
}
module.exports = { createHttpServerMessageBus };