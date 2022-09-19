const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpservermessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerMessageBusFactoryContainer.singleton
* Create HttpServerMessageBus
* @param {factoryContainerBindingName,timeout,scopeId,senderHost,senderPort}
*/
function createHttpServerMessageBus({factoryContainerBindingName,timeout,scopeId,senderHost,senderPort}) {
    const ctorArgs = {factoryContainerBindingName,timeout,scopeId,senderHost,senderPort};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerMessageBus };
