const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientMessageBusManagerFactoryContainer.singleton
* Create HttpClientMessageBusManager
* @param {factoryContainerBindingName}
*/
function createHttpClientMessageBusManager({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientMessageBusManager };
