const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusFactoryContainer.singleton
* Create HttpServerMessageBus
* @param {factoryContainerBindingName,timeout,senderHost,senderPort}
*/
function createHttpServerMessageBus({factoryContainerBindingName,timeout,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,timeout,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerMessageBus };
