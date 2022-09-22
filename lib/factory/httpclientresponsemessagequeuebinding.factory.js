const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpClientResponseMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientResponseMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpClientResponseMessageQueueBinding };
