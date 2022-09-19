const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientRequestMessageBusFactoryContainer.singleton
* Create HttpClientRequestMessageBus
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientRequestMessageBus({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientRequestMessageBus };
