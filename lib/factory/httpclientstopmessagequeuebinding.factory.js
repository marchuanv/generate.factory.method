const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpclientstopmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpClientStopMessageQueueBindingFactoryContainer.singleton
* Create HttpClientStopMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpClientStopMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpClientStopMessageQueueBinding };
