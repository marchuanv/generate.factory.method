const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartedMessageQueueBinding
* @param {factoryContainerBindingName,scopeId}
*/
function createHttpServerStartedMessageQueueBinding({factoryContainerBindingName,scopeId}) {
    const ctorArgs = {factoryContainerBindingName,scopeId};
    return factory.getInstance({ factoryContainerBindingName, ctorArgs });
}
module.exports = { createHttpServerStartedMessageQueueBinding };
