const { Factory } = require('../factory.js');
const container = require('C:\\component\\lib\\factory\\messagequeue.factory.container.json');
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
