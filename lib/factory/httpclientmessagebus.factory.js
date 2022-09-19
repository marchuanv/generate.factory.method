const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientMessageBusFactoryContainer.singleton
* Create HttpClientMessageBus
* @param {factoryContainerBindingName,timeout,scopeId}
*/
function createHttpClientMessageBus({factoryContainerBindingName,timeout,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,timeout,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientMessageBus };
