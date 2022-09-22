const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerResponseMessageBusFactoryContainer.singleton
* Create HttpServerResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpServerResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerResponseMessageBus };
