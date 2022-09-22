const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.container.json');
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
