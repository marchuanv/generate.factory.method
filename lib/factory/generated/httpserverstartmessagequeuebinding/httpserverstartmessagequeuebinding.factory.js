const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\httpserverstartmessagequeuebinding\\httpserverstartmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStartMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStartMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStartMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerStartMessageQueueBinding };
