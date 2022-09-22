const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverstartedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStartedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStartedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerStartedMessageQueueBinding };
