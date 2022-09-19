const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientMessageBusFactoryContainer.singleton
* Create HttpClientMessageBus
* @param {factoryContainerBindingName,timeout}
*/
function createHttpClientMessageBus({factoryContainerBindingName,timeout}) {
    const ctorArgs = {factoryContainerBindingName,timeout};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientMessageBus };
