const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpclientrequestmessagebus\\httpclientrequestmessagebus.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientRequestMessageBusFactoryContainer.singleton
* Create HttpClientRequestMessageBus
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageBus({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpClientRequestMessageBus };
