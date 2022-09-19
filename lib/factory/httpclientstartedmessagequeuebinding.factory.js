const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartedMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientStartedMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientStartedMessageQueueBinding };
