const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\httpserverstoppedmessagequeuebinding.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: HttpServerStoppedMessageQueueBindingFactoryContainer.singleton
* Create HttpServerStoppedMessageQueueBinding
* @param {factoryContainerBindingName}
*/
function createHttpServerStoppedMessageQueueBinding({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {factoryContainerBindingName} });
}
module.exports = { createHttpServerStoppedMessageQueueBinding };
