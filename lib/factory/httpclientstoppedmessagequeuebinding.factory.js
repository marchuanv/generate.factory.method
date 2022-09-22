const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStoppedMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStoppedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpClientStoppedMessageQueueBinding };
