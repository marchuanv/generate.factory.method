const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpclientmessagebus\\httpclientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientMessageBusFactoryContainer.singleton
* Create HttpClientMessageBus
* @param {timeout,factoryContainerBindingName}
*/
function createHttpClientMessageBus({timeout,factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {timeout,factoryContainerBindingName} });
}
module.exports = { createHttpClientMessageBus };
