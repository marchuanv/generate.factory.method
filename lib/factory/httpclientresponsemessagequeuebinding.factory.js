const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientresponsemessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientResponseMessageQueueBindingFactoryContainer.singleton
* Create HttpClientResponseMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientResponseMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientResponseMessageQueueBinding };
