const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerRequestMessageBusFactoryContainer.singleton
* Create HttpServerRequestMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerRequestMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerRequestMessageBus };
