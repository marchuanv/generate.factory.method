const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStartedMessageQueueBinding({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientStartedMessageQueueBinding };
