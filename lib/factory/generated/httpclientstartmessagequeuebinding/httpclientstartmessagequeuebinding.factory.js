const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpclientstartmessagequeuebinding\\httpclientstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStartMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStartMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpClientStartMessageQueueBinding };
