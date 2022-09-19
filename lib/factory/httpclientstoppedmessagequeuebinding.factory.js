const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStoppedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStoppedMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientStoppedMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
