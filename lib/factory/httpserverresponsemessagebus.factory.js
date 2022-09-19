const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerResponseMessageBusFactoryContainer.singleton
* Create HttpServerResponseMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerResponseMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerResponseMessageBus };
