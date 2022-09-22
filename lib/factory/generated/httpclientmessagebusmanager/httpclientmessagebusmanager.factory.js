const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpclientmessagebusmanager\\httpclientmessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientMessageBusManagerFactoryContainer.singleton
* Create HttpClientMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpClientMessageBusManager({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpClientMessageBusManager };
