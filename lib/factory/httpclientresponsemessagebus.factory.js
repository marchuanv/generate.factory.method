const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientResponseMessageBusFactoryContainer.singleton
* Create HttpClientResponseMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientResponseMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientResponseMessageBus };
