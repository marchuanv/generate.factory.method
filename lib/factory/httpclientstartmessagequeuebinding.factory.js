const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStartMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStartMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientStartMessageQueueBinding({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientStartMessageQueueBinding };
