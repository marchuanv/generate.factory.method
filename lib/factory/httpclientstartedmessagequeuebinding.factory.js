const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStartedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpClientStartedMessageQueueBinding };
