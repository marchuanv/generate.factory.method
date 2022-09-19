const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientrequestmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientRequestMessageQueueBindingFactoryContainer.singleton
* Create HttpClientRequestMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpClientRequestMessageQueueBinding({factoryContainerBindingName}) {
    const ctorArgs = {factoryContainerBindingName};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientRequestMessageQueueBinding };
