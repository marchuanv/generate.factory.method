const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientmessagebusmanager.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientMessageBusManagerFactoryContainer.singleton
* Create HttpClientMessageBusManager
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientMessageBusManager({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientMessageBusManager };
