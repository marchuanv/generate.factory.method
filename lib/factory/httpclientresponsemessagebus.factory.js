const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientresponsemessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientResponseMessageBusFactoryContainer.singleton
* Create HttpClientResponseMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageBus({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientResponseMessageBus };
