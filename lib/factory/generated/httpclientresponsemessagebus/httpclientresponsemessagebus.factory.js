const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpclientresponsemessagebus\\httpclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientResponseMessageBusFactoryContainer.singleton
* Create HttpClientResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpClientResponseMessageBus };
