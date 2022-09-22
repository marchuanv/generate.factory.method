const { Factory } = require('C:\\component\\lib\\factory\\factory.js');
const container = require('C:\\component\\lib\\factory\\generated\\messagequeue\\messagequeue.factory.container.json');
const factory = new Factory(container);

/**
* IsSingleton: MessageQueueFactoryContainer.singleton
* Create MessageQueue
* @param {}
*/
function createMessageQueue({factoryContainerBindingName}) {
    return factory.getInstance({ factoryContainerBindingName, ctorArgs: {} });
}
module.exports = { createMessageQueue };
